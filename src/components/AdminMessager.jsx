import React, { useEffect, useRef, useState } from "react"
import { FaFacebookMessenger } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { LucideMinus, SendHorizontal } from "lucide-react"
import Logo from "../public/images/logo.png"
import decorate from "../public/images/product-decorate.jpg"

const AdminMessager = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const chatVariants = {
    hidden: { opacity: 0, scale: 0, x: "100%", y: "100%" },
    visible: { opacity: 1, scale: 1, x: "0%", y: "0%" },
  }
  const sendMessage = () => {
    // if (newMessage.trim()) {
    //   socket.emit("send_message", newMessage);
    //   setMessages((prevMessages) => [...prevMessages, { text: newMessage }]);
    //   setNewMessage("");
    // }
  };
  const endOfMessagesRef = useRef(null);

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

              <div className="p-5">
                <div className="min-w-[280px] h-full overflow-y-scroll flex flex-col">
                  <div className="flex items-center bg-black/20 px-2 rounded-lg my-2">
                    <div className="w-[55px] h-[55px]  rounded-full overflow-hidden flex items-center justify-center ">
                      <img
                        alt="Logo"
                        src={decorate}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-2 w-[260px]">
                      <h2 className="text-[20px] font-medium font-sans">
                        Lê Huy Thanh
                      </h2>
                      <h2 className="text-[17px]  font-sans  truncate text-nowrap">
                        Mày cần rep tin nahfhafhakshdkfdkhf{" "}
                      </h2>
                    </div>
                  </div>
                 
                </div>
              </div>

              <div className="flex flex-col w-full py-2 pl-2 bg-white/45">
              <div className="min-h-[80px]">
                <div className="flex items-center gap-3">
                <div className="w-[45px] h-[45px]  rounded-full overflow-hidden flex items-center justify-center ">
                      <img
                        alt="Logo"
                        src={decorate}
                        className="object-cover w-full h-full"
                      />
                 </div>
                   <h2 className="text-[18px] font-medium font-sans">
                        Lê Huy Thanh
                      </h2>
                </div>
                </div>
              <div className="w-full h-full ">
                <div className="messagerBody relative w-full h-[700px] pr-2 overflow-y-scroll ">
                  <div className="flex gap-1">
                    <div className="w-[35px] h-[35px] shadow-md rounded-full overflow-hidden flex items-center justify-center ">
                      <img
                        alt="Logo"
                        src={Logo}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="rounded-lg max-w-[650px] bg-white text-wrap p-4 shadow-sm text-[18px] font-sans">
                        Hello how are you. i just want to talk to you a bit  Hello how are you. i just want to talk to you a bit  Hello how are you. i just want to talk to you a bit
                      </div>
                      <div className="rounded-lg max-w-[250px] bg-white text-wrap p-4 shadow-sm text-[18px] font-sans">
                        I want to thank you for helping me
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex justify-end my-2">
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        Hello how are you. i just want to talk to you a bit
                      </div>
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        thats fine
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end my-2">
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        Hello how are you. i just want to talk to you a bit
                      </div>
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        thats fine
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end my-2">
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        Hello how are you. i just want to talk to you a bit
                      </div>
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        thats fine
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end my-2">
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        Hello how are you. i just want to talk to you a bit
                      </div>
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        thats fine
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end my-2">
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        Hello how are you. i just want to talk to you a bit
                      </div>
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        thats fine
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end my-2">
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        Hello how are you. i just want to talk to you a bit
                      </div>
                      <div className="rounded-lg max-w-[250px] bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white">
                        thats fine
                      </div>
                    </div>
                  </div>
                  <div ref={endOfMessagesRef}> </div>
                </div>
              </div>

              <div className="relative w-full ">
                  <input
                    type="text"
                    className="relative px-3 py-3 w-full border focus-within:border-orange-1 focus-visible:outline-none rounded-lg"
                  ></input>
                  <SendHorizontal className="text-[18px] text-gray-1 absolute right-5 top-[50%] translate-y-[-50%] cursor-pointer" />
                </div>
                
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
