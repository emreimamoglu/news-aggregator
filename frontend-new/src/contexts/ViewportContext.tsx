import { createContext, useState, useEffect } from "react";
import {ViewportContext} from '../types/ViewportContext';

export const viewportContext = createContext<ViewportContext>({
  width: 0,
  height: 0,
});

export const ViewportProvider = ({ children } : {
    children: React.ReactNode;
}) => {
  
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
  
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  
    useEffect(() => {
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    return (
      <viewportContext.Provider value={{ width, height }}>
        {children}
      </viewportContext.Provider>
    );
  };