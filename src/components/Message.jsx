import jwtDecode from "jwt-decode"
import React, { useState } from "react"
import Avatar from "/imgs/avatar.jpg"
import { cn } from "@/lib/utils"
import { formatDate } from "@/utilities/utils"
const Message = ({message, isRecently,isSperated, previousTime, isFirstText, isAdmin}) => {
  const [decodedToken, setDecodeToken] = useState(() => {
     if(!localStorage.getItem("token")) return null 
       const token = localStorage.getItem("token")
      return jwtDecode(token)
  })
  return (
    <>
     {
        (message && !isRecently && !isFirstText) && (
          <div className="w-full flex items-center justify-center">{formatDate(previousTime)}</div>
        )
      } 
      {message && message.senderId?._id === decodedToken.id ? (
        <div className="w-full flex justify-end">
            <div className={cn(
                    'rounded-lg bg-blue-1 text-wrap p-4 shadow-sm text-[18px] font-sans text-white',
                    isRecently ? "mt-1" : "mt-3",
                    isAdmin ? "max-w-[650px]" : "max-w-[250px]"
                  )}>
             {message.text}
            </div>
        </div>
      ) : (
        <div className="flex gap-1">
          <div className="w-[35px] h-[35px] rounded-full overflow-hidden flex items-center justify-center ">
          
           {
            isSperated ? <img alt="Avatar" src={message.senderId?.image ? message.senderId.image : Avatar} className="object-cover w-full h-full" /> :
            !isRecently ? <img alt="Avatar" src={message.senderId?.image ? message.senderId.image : Avatar} className="object-cover w-full h-full" />:
            ''
           }
          </div>
            <div className={cn(
                "mb-1 rounded-lg  bg-white text-wrap p-4 shadow-sm text-[18px] font-sans",
                 isRecently ? "mt-1" : "mt-3",
                 isAdmin ? "max-w-[650px]" : "max-w-[250px]"
            )}>
            {message.text}
          </div>
        </div>
      )}
    </>
  )
}

export default Message
