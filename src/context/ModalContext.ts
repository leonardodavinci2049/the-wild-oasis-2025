import { createContext } from "react";



const initialContextoValue = {
  openName: "",
  close: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open: (_name: string) => {},
}



const ModalContext = createContext(initialContextoValue);

export { ModalContext };
