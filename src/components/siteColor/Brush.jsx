import { useThemeContext } from "@/contexts/ThemeProvider";
import { motion , AnimatePresence} from "framer-motion";
import React, { useState } from "react";
import { IoMdBrush } from "react-icons/io";

const colors = [
  {
    name: "Blue",
    color: "#11cdef",
  },
  {
    name: "Green",
    color: "#2dce89",
  },
  {
    name: "Red",
    color: "#f5365c",
  },
  {
    name: "Yellow",
    color: "#ff9800",
  },
  {
    name: "Purple",
    color: "#5e72e4",
  },
  {
    name: "Orange",
    color: "#fb6340",
  },
  {
    name: "Gray",
    color: "#344767",
  },
];

const Brush = () => {
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState('');
  const {colorCode, setColorCode, setIsBoxed } = useThemeContext()

  const handleClick = () => {
    setOpen(!open);
    console.log("handle");
  };
  return (
    <div className="fixed hidden z-50 right-2 top-[120px] lg:flex flex-col items-end gap-3">
      <motion.div
        className="cursor-pointer p-4 rounded-lg"
        initial={{ boxShadow: "0 0 10px 1px rgba(0,0,0,0.10) " }}
        whileHover={{ boxShadow: "0 0 10px 1px rgba(0,0,0,0.35) " }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        onClick={() => handleClick()}
      >
        <IoMdBrush className="text-[30px]" />
      </motion.div>
      <AnimatePresence>
      {open && (
        <motion.div
          className={`w-[300px] max-h-[550px] overflow-auto bg-white rounded-lg shadow-[0_0_10px_1px_rgba(0,0,0,0.10)] p-5`}
          initial={{ x: 550 , opacity: 0.5}}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 550, opacity: 0.5}}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <h1 className="py-2 text-[25px] ">Site Color</h1>
          <hr />
          <div>
            <span className="font-semibold">Pattern Color Variable:</span>{" "}
            <br />
            <span className="font-[100]">
              ( You can change any color as you want in source code. )
            </span>
            <div className="flex flex-col gap-2 mt-3">
              {colors.map((item) => {
                return (
                  <motion.div
                    key={item.name}
                    onHoverStart={()=> setIsHover(item.name)}
                    onHoverEnd={()=> setIsHover('')}
                    onClick={()=> setColorCode(item.color)}
                    className="flex items-center justify-between cursor-pointer group border-b-2 pb-2 transition-all ease-in-out duration-300"
                  >
                    <span className="group-hover:text-black font-bold text-dark-textSoft transition-all duration-300 ease-linear">
                      {item.name}
                    </span>
                    <motion.div
                      className={`w-8 h-8 rounded-full group-hover:rounded-lg transition-all ease-in-out duration-300`}
                      initial={{borderRadius: '50%'}}
                      animate={{borderRadius: isHover == item.name ? '20%' : '50%'}}
                      transition={{duration: 0.3, ease: 'backIn'}}
                      style={{ backgroundColor: item.color }}
                    ></motion.div>
                  </motion.div>
                );
              })}
            </div>
            <div>
              <h1 className="py-2 text-[25px] border-b-2 pt-10">
                Layout Options
              </h1>
              <div className="flex flex-row gap-6 items-center justify-center p-5 text-[20px] cursor-pointer">
                <button className="shadow-xl bg-gray-300 text-black p-2" onClick={()=> setIsBoxed(false)}>
                  Wide
                </button>
                <button className="shadow-xl bg-black text-white p-2" onClick={()=> setIsBoxed(true)}>Boxed</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default Brush;
