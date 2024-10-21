import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";

const ButtonCustome = ({ buttonText }) => {
  const { colorCode } = useThemeContext();
  const [isHovered, setIsHovered] = useState(false); // State để theo dõi hover

  return (
    <div className="flex items-center justify-center">
      <motion.button
        onHoverStart={() => setIsHovered(true)} // Khi hover vào button
        onHoverEnd={() => setIsHovered(false)} // Khi hover ra khỏi button
        className="max-w-fit relative flex flex-col mx-auto p-3 rounded-full px-8 text-[20px] font-semibold text-white group"
        style={{ backgroundColor: colorCode }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            className="flex flex-col"
            animate={{ y: isHovered ? -2 : 0 }} // Text sẽ dịch chuyển lên khi hover
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            {buttonText}
          </motion.div>
          {/* Hiệu ứng dấu chấm nhỏ và đường line */}
          <motion.span
            animate={{
              left: isHovered ? 0 : "auto", // Khi hover: left 0
              right: isHovered ? "auto" : 20, // Khi không hover: right 3
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="absolute top-[50%] translate-y-[-50%] w-1 h-1 rounded-full bg-white"
          />
          <motion.div
            animate={{ y: isHovered ? -2 : 100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }} // Cập nhật easeInOut để mượt hơn
            className="w-full h-[1px] bg-white"
          />
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ButtonCustome;

// import { motion, AnimatePresence } from 'framer-motion'
// import React, { useState } from 'react'

// const ButtonCustom = () => {
//     const [isHovered, setIsHovered] = useState(false)
//   return (
//    <motion.button 
//    onHoverStart={() => setIsHovered(true)}
//    onHoverEnd={() => setIsHovered(false)}
//    className='relative p-2 px-5 text-white bg-blue-1 rounded-lg flex flex-col'
//    >
//     <AnimatePresence mode='popLayout'>
//       <motion.div 
//         className='text-white flex items-center justify-between relative'
//         animate={{ y: isHovered ? -2 : 0 }}  // Chữ "Explore" sẽ bị đẩy lên khi hover
//         transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        
//       >
//         Explore 
//       </motion.div>
//         <motion.span
//          animate={{
//             left: isHovered ? 0 : 'auto',  // Khi hover: left 0
//             right: isHovered ? 'auto' : 5,  // Khi không hover: right 3
//             opacity: isHovered ? 0 : 1
//          }}
//          transition={{duration: 0.4}}
//          className='absolute top-[50%] translate-y-[-50%] w-1 h-1 rounded-full bg-white'
//          />

//         <motion.div 
//           animate={{ y: isHovered ? -2 : 100 }}
//           transition={{ duration: 0.4, ease: 'easeInOut' }}  // Cập nhật easeInOut để mượt hơn
//           className='w-full h-[1px] bg-white'
//         />
//     </AnimatePresence>
// </motion.button>
//   )
// }

// export default ButtonCustom
