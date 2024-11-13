import React, { useEffect, useRef, useState } from "react"
import { FaFacebookMessenger } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { LucideMinus, SendHorizontal } from "lucide-react"
import Logo from "../public/images/logo.png"
import { Input } from "./ui/input"
import { jwtDecode } from "jwt-decode"
import { useFetchData } from "@/hooks/useFetchData"
import { toast } from "@/hooks/use-toast"
import { ServerUrl } from "@/utilities/utils"
import { Button } from "./ui/button"
import Message from "./Message"
import { socket } from "@/main"

const Messager = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [valueInput, setValueInput] = useState("")
  const [decodedToken, setDecodeToken] = useState(()=>{
      const token = localStorage.getItem('token')
      return jwtDecode(token)
       
  })
  const endOfMessagesRef = useRef(null);

  const chatVariants = {
    hidden: { opacity: 0, scale: 0, x: "100%", y: "100%" },
    visible: { opacity: 1, scale: 1, x: "0%", y: "0%" },
  }
  useEffect(() => {
    const fetData = async () => {
      try {
        const res = await fetch(ServerUrl+"/api/message/"+ decodedToken.id, {
          method: "GET",
        })
          const data = await res.json()
          console.log(data)
          if(data.messages) setMessages(data.messages)
          setConversationId(data.conversationId)
      } catch (error) {
        console.log(error)
        toast({
          variant: "destructive",
          title: "Something wrong with useFetchData!",
        })
      }
    }
    fetData()
  }, [])
  // nhận tin nhắn
  useEffect(() => {
    const handleReceiveMessage = socket.on('receiveMessage',(mess) => setMessages(pre=>[...pre, mess]))
    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []);
  
  useEffect(()=>{
     const handleJoin = socket.emit('joinRoom', conversationId)
     return () => {
      socket.off('joinRoom', handleJoin);
    };
  },[conversationId])
console.log(messages)
  // Gửi tin nhắn
  const sendMessage = async (e) => {
    e.preventDefault()
    if (!valueInput) return
    if (!decodedToken.id)
      return toast({
        variant: "destructive",
        title: "Bạn cần đăng nhập để nhắn tin",
      })
    const userId = decodedToken.id
    if (messages.length === 0) {
      socket.emit("createConversation", {
        lastMessage: { text: valueInput },
        _id: conversationId,
        createdAt: new Date(),
        userId: {
          _id: decodedToken.id,
          image: decodedToken.image,
          userName: decodedToken.userName,
        },
      })
    } else {
      socket.emit("sendMessage", {
        text: valueInput,
        roomId: conversationId,
        _id: conversationId,
        createdAt: new Date(),
        senderId: {
          _id: decodedToken.id,
          image: decodedToken.image,
        },
      })
    }
    try {
      const res  = await fetch(ServerUrl+"/api/message", {
        method: "POST",
        headers: {
         "Content-Type": "application/json"
        },
        body: JSON.stringify({
          senderId: userId,
          text: valueInput,
          conservationId: conversationId,
        }),
      })
      if(!res.ok) return toast({variant: "destructive", title: "Không thể gửi tin nhắn"})
      setMessages(pre=>[...pre, {text:valueInput, senderId:{_id: userId}, createdAt: new Date()}])
      setValueInput('')
    } catch (error) {
      console.log(error)
      toast({variant: "destructive", title: "Không thể gửi tin nhắn"})
    }
  };
  const createConversation = async () => {
    try {
      if(!decodedToken.id) return toast({variant: "destructive", title: "Bạn cần đăng nhập để nhắn tin"})
      const userId = decodedToken.id
      const res  = await fetch(ServerUrl+"/api/conversation", {
        method: "POST",
        headers: {
         "Content-Type": "application/json"
        },
        body: JSON.stringify({
          senderId: userId,
        }),
      })
      const data = await res.json()
      if(!res.ok) return
      setConversationId(data.conversationId)
      toast({variant: "success", title: data.message})
    } catch (error) {
      console.log(error)
      toast({variant: "destructive", title: "Không tạo cuộc trò chuyện"})
    }
  };


  // Cuộn đến tin nhắn mới nhất khi có tin nhắn mới
  useEffect(() => {
    if (isOpen) {
       setTimeout(()=>{
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
       },300)
    }
  }, [isOpen , messages]);
  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial="visible"
            animate="hidden"
            exit="hidden"
            onClick={() => setIsOpen(!isOpen)}
            className="fixed z-50 right-5 bottom-5  rounded-full flex items-center justify-center"
          >
            <FaFacebookMessenger className="text-[35px] text-blue-1 " />
            <p className="absolute top-0 left-0 bg-sky-400 opacity-75 inline-flex w-full h-full rounded-full animate-ping duration-2000"></p>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={chatVariants}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed z-50 bottom-4 right-4 w-96 h-[555px] bg-[#f6f6f6] rounded-lg shadow-panel  p-4"
          >
            <div className="w-full h-full ">
            <h2 className="text-xl font-semibold">Chat với chúng tôi!</h2>
          
          {
           !conversationId ? <div className="w-full h-full flex items-center justify-center">
            <Button onClick={()=>createConversation()}>Nhắn tin tư vấn</Button>
           </div> : (
           <>
              <div className="messagerBody relative w-full h-[440px] pr-2 pb-1 overflow-y-scroll ">
              {
               messages.map((message, index) =>{
                let isRecently = true
                let isSperated = true
                let previousTime = message.createdAt
                const isFirstText = index === 0
                 if(index > 1) {
                 const currentTime = new Date(message.createdAt).getTime();
                  previousTime = new Date(messages[index-1].createdAt).getTime();
                  // Kiểm tra nếu thời gian chênh lệch nhỏ hơn hoặc bằng 1 phút (60000 ms)
                 isRecently = (currentTime - previousTime) <= 65000;
                  //  Kiểm tra xem tin nhắn có sen kẽ nhau không để hiện avatar
                  isSperated = message.senderId._id !== messages[index-1].senderId._id
                 }
                 return <Message 
                  key={message._id}
                  message={message}
                  isRecently={isRecently}
                  previousTime={previousTime}
                  isSperated={isSperated}
                  isFirstText={isFirstText}
                 />
               })
              }
              <div ref={endOfMessagesRef}></div>
             </div>
           
             <form  onSubmit={sendMessage} className="relative w-full ">
                <input 
                autoFocus={true}
                onChange={e=>setValueInput(e.target.value)}
                value={valueInput}
                type="text" 
                className="relative px-3 py-3 w-full border focus-within:border-orange-1 focus-visible:outline-none rounded-lg"
                /> 
                 <SendHorizontal 
                 onClick={sendMessage} 
                 className="text-[18px] text-gray-1 absolute right-5 top-[50%] translate-y-[-50%] cursor-pointer"
                  />
            </form>
           </>
          )
          }
            </div>
            <button
              className="absolute top-2 right-2 text-gray-500 p-1 hover:bg-black/10 rounded-lg duration-200"
              onClick={() => setIsOpen(false)}
            >
              <LucideMinus />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Messager
