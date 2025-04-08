import { createContext } from "react";

export type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const initialStateContext: DarkModeContextType = {
  isDarkMode: false,
  toggleDarkMode: () => {},
};


const DarkModeContext = createContext<DarkModeContextType>(initialStateContext);


export { DarkModeContext };