import { useContext } from "react";
import { DarkModeContext, DarkModeContextType } from "./DarkModeContext";


const  useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}
export { useDarkMode };