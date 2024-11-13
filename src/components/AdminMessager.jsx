import React, { useEffect, useRef, useState } from "react"
import { FaFacebookMessenger } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { LucideMinus, SendHorizontal } from "lucide-react"
import Logo from "../public/images/logo.png"
import decorate from "../public/images/product-decorate.jpg"
import { ServerUrl } from "@/utilities/utils"
import { jwtDecode } from "jwt-decode"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import Message from "./Message"
import { socket } from "@/main"



const AdminMessager = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([]);
  const [conversations, setConversation] = useState([])
  const [currentConversation, setCurrentConversation] = useState(null)
  const [valueInput, setValueInput] = useState("")
  const endOfMessagesRef = useRef(null);
  const [decodedToken, setDecodeToken] = useState(()=>{
    const token = localStorage.getItem('token')
    return jwtDecode(token)
  })

  const chatVariants = {
    hidden: { opacity: 0, scale: 0, x: "100%", y: "100%" },
    visible: { opacity: 1, scale: 1, x: "0%", y: "0%" },
  }
  // Nhận tin nhắn từ socket và createConversation từ socket
  console.log({messages})
  useEffect(() => {
    const handleReceiveMessage = socket.on('receiveMessage', (mess) => setMessages(pre=>[...pre, mess]))
    const handleReceiveConversation = socket.on('receiveConversation', (data) => {
      setMessages(pre=>[...pre, {text:data.lastMessage.text, senderId:{_id: data.userId._id}, createdAt: new Date()}])
      setConversation(pre=>[data ,...pre]);
      setCurrentConversation(data);
    })

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('receiveConversation', handleReceiveConversation);
    };
  }, []);
  console.log({currentConversation})
// Gửi tin nhắn
  const sendMessage = async (e) => {
    e.preventDefault()
    socket.emit('sendMessage', {
      text: valueInput,
      roomId:currentConversation._id,
      _id: currentConversation._id,
      createdAt: new Date(),
      senderId: {
        _id: decodedToken.id,
        image: decodedToken.image
      }
    })
    try {
      if(!valueInput) return
      if(!decodedToken.id) return toast({variant: "destructive", title: "Bạn cần đăng nhập để nhắn tin"})
      const userId = decodedToken.id
      const res  = await fetch(ServerUrl+"/api/message", {
        method: "POST",
        headers: {
         "Content-Type": "application/json"
        },
        body: JSON.stringify({
          senderId: userId,
          text: valueInput,
          conservationId: currentConversation._id,
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
  useEffect(()=>{
    const handleJoin = socket.emit('joinRoom', currentConversation?._id)
    return () => {
      socket.off('joinRoom', handleJoin);
    };
  },[currentConversation])

  useEffect(() => {
    const fetData = async () => {
      try {
        const res = await fetch(ServerUrl+"/api/conversation/"+decodedToken.id, {
          method: "GET",
        })
          const data = await res.json()
          setConversation(data.recentConversations)
          setCurrentConversation(data.recentConversations[0])
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
// Lấy tin nhắn trong conversation
useEffect(() => {
  const fetData = async () => {
    try {
      const res = await fetch(ServerUrl+"/api/message/v2/"+ currentConversation._id, {
        method: "GET",
      })
        const data = await res.json()
        if(!res.ok) return toast({variant: "destructive", title:data.error})
        setMessages(data.messages)
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Something wrong with useFetchData!",
      })
    }
  }
  if(currentConversation) fetData()
}, [currentConversation])
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
            className="fixed z-50 bottom-4 right-4 w-[1300px] h-[855px] bg-[#f6f6f6] rounded-lg shadow-panel"
          >
            <div className="w-full h-full flex">
              <div className="p-2 border-r border-black/20">
                <div className="max-w-[90px] h-full flex flex-col  ">
                  <button className="w-full p-5 rounded-lg cursor-pointer hover:bg-black/10">
                    Khách
                  </button>
                  <button className="w-full p-5 text-nowrap rounded-lg cursor-pointer hover:bg-black/10">
                    Quản lý
                  </button>
                </div>
              </div>
            {/* Danh sách tin nhắn */}
              <div className="p-5">
                <div className="min-w-[280px] h-full overflow-y-scroll flex flex-col">
                 {
                 conversations && conversations.map((conver, index)=>(
                    <div
                    key={index}
                     onClick={()=>setCurrentConversation(conver)} 
                     className={cn(
                      "flex items-center px-2 rounded-lg my-2 cursor-pointer",
                      conver._id === currentConversation._id ? "bg-black/10" : ""
                     )}
                     >
                    <div className="w-[55px] h-[55px]  rounded-full overflow-hidden flex items-center justify-center ">
                      <img
                        alt="Logo"
                        src={conver.userId?.image ? conver.userId?.image : decorate}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-2 w-[260px]">
                      <h2 className="text-[20px] font-medium font-sans">
                      {conver.userId._id === decodedToken.id ? "Bản thân" : conver.userId.userName}
                      </h2>
                      <h2 className="text-[17px]  font-sans  truncate text-nowrap">
                       {conver.lastMessage?.text}
                      </h2>
                    </div>
                  </div>
                  ))
                 }
                </div>
              </div>

              <div className="flex flex-col w-full py-2 pl-2 bg-white/45">
              <div className="min-h-[80px]">
                {
                  currentConversation && (<div className="flex items-center gap-3">
                    <div className="w-[45px] h-[45px]  rounded-full overflow-hidden flex items-center justify-center ">
                          <img
                            alt="Logo"
                            src={currentConversation.userId?.image ? currentConversation.userId?.image : decorate}
                            className="object-cover w-full h-full"
                          />
                     </div>
                       <h2 className="text-[18px] font-medium font-sans">
                         {currentConversation.userId?._id === decodedToken.id ? "Bản thân" : currentConversation.userId?.userName}
                        </h2>
                    </div>)
                }
                </div>
              <div className="w-full h-full ">
                <div className="messagerBody relative w-full h-[700px] pr-2 overflow-y-scroll ">
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
                  isFirstText={isFirstText}
                  isSperated={isSperated}
                  isAdmin={true}
                 />
               })
              }
                  <div ref={endOfMessagesRef}> </div>
                </div>
              </div>

              <form onSubmit={sendMessage} className="relative w-full">
                  <input
                   autoFocus={true}
                    onChange={e=>setValueInput(e.target.value)}
                    type="text"
                    value={valueInput}
                    className="relative px-3 py-3 w-full border focus-within:border-orange-1 focus-visible:outline-none rounded-lg"
                  />
                  <SendHorizontal 
                   onClick={sendMessage} 
                  className="text-[18px] text-gray-1 absolute right-5 top-[50%] translate-y-[-50%] cursor-pointer"
                   />
                </form>
              </div>

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

export default AdminMessager
