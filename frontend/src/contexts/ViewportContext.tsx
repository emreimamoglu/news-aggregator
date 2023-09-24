import { createContext, useState, useEffect, useMemo } from "react";
import { ViewportContext } from '../types/ViewportContext';
import throttle from 'lodash.throttle';

export const viewportContext = createContext<ViewportContext>({
  width: 0,
  height: 0,
});

export const ViewportProvider = ({ children }: {
  children: React.ReactNode;
}) => {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleWindowResize = throttle(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, 250);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      handleWindowResize.cancel();
      window.removeEventListener("resize", handleWindowResize)
    };
  }, []);


  const value = useMemo(() => ({ width, height }), [width, height]);

  return (
    <viewportContext.Provider value={value}>
      {children}
    </viewportContext.Provider>
  );
};