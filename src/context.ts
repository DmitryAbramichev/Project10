import { createContext, useContext } from "react";
import type { Launches } from "./types"; 

interface AppContextValue {
    launches: Launches[];
    openModal: (launch: Launches) => void; 
}

export const AppContext = createContext({} as AppContextValue);

export function useAppContext () {
    return useContext(AppContext);
}