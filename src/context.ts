import { createContext, useContext } from "react";
import type { Launches } from "./types"; // предполагаем, что тип называется Launch

interface AppContextValue {
    launches: Launches[];
    openModal: (launch: Launches) => void; // новая функция
}

export const AppContext = createContext({} as AppContextValue);

export function useAppContext () {
    return useContext(AppContext);
}