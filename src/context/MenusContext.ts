/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";


const initialContextoValue = {
  openId: "",
  close: () => {},
  open: (_id: string) => {},
  position: null as { x: number; y: number } | null,
  
  setPosition: (_position: { x: number; y: number }) => {},
};

const MenusContext = createContext(initialContextoValue);

export { MenusContext };
