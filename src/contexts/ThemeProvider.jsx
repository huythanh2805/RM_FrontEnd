import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorCode, setColorCode] = useState("#fb6340");
  const [isBoxed, setIsBoxed] = useState(false);

  return (
    <ThemeContext.Provider value={{ colorCode, setColorCode, isBoxed, setIsBoxed }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useThemeContext = ()=>{
    return useContext(ThemeContext)
}
