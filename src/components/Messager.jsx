import React, { useEffect, useRef, useState } from "react"
import { FaFacebookMessenger } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { LucideMinus, SendHorizontal } from "lucide-react"
import { Input } from "./ui/input"
import  jwtDecode  from "jwt-decode"
import { useFetchData } from "@/hooks/useFetchData"
import { toast } from "@/hooks/use-toast"
import { ServerUrl } from "@/utilities/utils"
import { Button } from "./ui/button"
import Message from "./Message"
import { socket } from "@/main"

const Messager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [valueInput, setValueInput] = useState("");
  const [unseenMessage, setUnseenMessage] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [decodedToken, setDecodeToken] = useState(() => {
    if (!localStorage.getItem("token")) return null;
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  });
  const endOfMessagesRef = useRef(null);
  const { data } = useFetchData(`${ServerUrl}/api/message/text/seen/${decodedToken?.id}/client`);

  const chatVariants = {
    hidden: { opacity: 0, scale: 0, x: "100%", y: "100%" },
    visible: { opacity: 1, scale: 1, x: "0%", y: "0%" },
  };
  // Lấy thông tin của người dùng dựa vào Id
  const {data: userData} = useFetchData(`${ServerUrl}/users/get/v2/${decodedToken?.id}`)
  
  useEffect(()=>{
    if(userData) setUser(userData.user)
  },[userData, isOpen])
  // Đồng bộ dữ liệu socket
  // Join phòng
  useEffect(() => {
    const handleJoin = socket.emit("joinRoom", conversationId);
    return () => {
      socket.off("joinRoom", handleJoin);
    };
  }, [conversationId]);
  useEffect(() => {
    const fetData = async () => {
      try {
        const res = await fetch(ServerUrl + "/api/message/" + decodedToken.id, {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        if (data.messages) setMessages(data.messages);
        setConversationId(data.conversationId);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Something wrong with useFetchData!",
        });
      }
    }
    if(decodedToken && decodedToken !== null){
      fetData()
    }
  }, [])
  // nhận tin nhắn
  useEffect(() => {
    const handleReceiveMessage = socket.on("receiveMessage", (mess) => {
      setMessages((pre) => {
        const newestMessages = [...pre, mess];
        return newestMessages;
      });
    });
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  // Update lại nhưng tin nhắn đã xem
  const fetUnseenMessage = async ()=>{
    if(isOpen){
     await fetch(`${ServerUrl}/api/message/text/seen/${conversationId}/${decodedToken.id}`, {
       method: "PUT",
       headers: {
        "Content-Type": "application/json"
       },
     })
    }
    const res = await fetch(`${ServerUrl}/api/message/text/seen/${decodedToken.id}/client`,{
     method: "GET"
    })
    const data = await res.json()
    setUnseenMessage(data.unseenMessageCount)
  }
  useEffect(()=>{
    if(decodedToken && decodedToken !== null) {
      fetUnseenMessage()
    }
 },[messages, isOpen, newMessage])
   console.log({decodedToken})
  // Gửi tin nhắn
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!valueInput) return;
    if (!decodedToken.id)
      return toast({
        variant: "destructive",
        title: "Bạn cần đăng nhập để nhắn tin",
      });
    if (messages.length === 0) {
      socket.emit("createConversation", {
        lastMessage: { text: valueInput, seen: false, senderId: user._id },
        _id: conversationId,
        seen: false,
        createdAt: new Date(),
        userId: {
          _id: user._id,
          image: user.image,
          userName: user.userName,
        },
      });
    } else {
      socket.emit("sendMessage", {
        text: valueInput,
        roomId: conversationId,
        _id: conversationId,
        seen: false,
        createdAt: new Date(),
        senderId: {
          _id: user._id,
          image: user.image,
          userName: user.userName,
        },
      });
    }
    try {
      const res = await fetch(ServerUrl + "/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: user._id,
          text: valueInput,
          conservationId: conversationId,
        }),
      });
      if (!res.ok) return toast({ variant: "destructive", title: "Không thể gửi tin nhắn" });
      setMessages((pre) => [...pre, { text: valueInput, senderId: { _id: user._id }, createdAt: new Date() }]);
      setValueInput("");
    } catch (error) {
      console.log(error);
      toast({ variant: "destructive", title: "Không thể gửi tin nhắn" });
    }
  };
  const createConversation = async () => {
    try {
      if (!decodedToken.id) return toast({ variant: "destructive", title: "Bạn cần đăng nhập để nhắn tin" });
      const res = await fetch(ServerUrl + "/api/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: user._id,
        }),
      });
      const data = await res.json();
      if (!res.ok) return;
      setConversationId(data.conversationId);
      toast({ variant: "success", title: data.message });
    } catch (error) {
      console.log(error);
      toast({ variant: "destructive", title: "Không tạo cuộc trò chuyện" });
    }
  };

  // Cuộn đến tin nhắn mới nhất khi có tin nhắn mới
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [isOpen, messages]);
  // Cập nhật lại ste dựa trên data lấy được từ useFetchData
  useEffect(() => {
    if (data) {
      setUnseenMessage(data.unseenMessageCount);
    }
  }, [data]);
  // Xử lí khi mở 1 cuộc trò chuyện sẽ cập nhật lại tin nhắn thành đã xem
  const handleSeenMessage = async () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      await fetch(`${ServerUrl}/api/message/text/seen/${conversationId}/${decodedToken.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setUnseenMessage(0);
    updatedUnseenStatus(true);
  };
  // Updata seen và cùng 1 true hoặc false
  const updatedUnseenStatus = (boolean) => {
    setMessages((pre) => pre.map((item) => ({ ...item, seen: boolean })));
  };
  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial="visible"
            animate="hidden"
            exit="hidden"
            onClick={() => handleSeenMessage()}
            className="fixed z-50 right-5 bottom-5  rounded-full flex items-center justify-center"
          >
            <FaFacebookMessenger className="text-[35px] text-blue-1 " />
            <p className="absolute top-0 left-0 bg-sky-400 opacity-75 inline-flex w-full h-full rounded-full animate-ping duration-2000"></p>
            {unseenMessage !== null && unseenMessage != 0 && (
              <span
                className="absolute w-5 h-5 top-0 left-0 -translate-y-[50%] -translate-x-[50%] rounded-full 
              flex items-center justify-center bg-red-1 text-white"
              >
                {unseenMessage}
              </span>
            )}
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

              {!conversationId ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Button onClick={() => createConversation()}>Nhắn tin tư vấn</Button>
                </div>
              ) : (
                <>
                  <div className="messagerBody relative w-full h-[440px] pr-2 pb-1 overflow-y-scroll ">
                    {messages.map((message, index) => {
                      let isRecently = true;
                      let isSperated = true;
                      let previousTime = message.createdAt;
                      const isFirstText = index === 0;
                      if (index > 1) {
                        const currentTime = new Date(message.createdAt).getTime();
                        previousTime = new Date(messages[index - 1].createdAt).getTime();
                        // Kiểm tra nếu thời gian chênh lệch nhỏ hơn hoặc bằng 1 phút (60000 ms)
                        isRecently = currentTime - previousTime <= 65000;
                        //  Kiểm tra xem tin nhắn có sen kẽ nhau không để hiện avatar
                        isSperated = message.senderId._id !== messages[index - 1].senderId._id;
                      }
                      return (
                        <Message
                          key={message._id}
                          message={message}
                          isRecently={isRecently}
                          previousTime={previousTime}
                          isSperated={isSperated}
                          isFirstText={isFirstText}
                        />
                      );
                    })}
                    <div ref={endOfMessagesRef}></div>
                  </div>

                  <form onSubmit={sendMessage} className="relative w-full ">
                    <input
                      autoFocus={true}
                      onChange={(e) => setValueInput(e.target.value)}
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
              )}
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
  );
};

export default Messager;
