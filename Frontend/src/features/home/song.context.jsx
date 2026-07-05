import { useState } from "react";

import { createContext } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({children}) => {
    
    const [song, setSong] = useState(null);
    const [loading, setloading] = useState(false);

    return (
        <SongContext.Provider value={{loading, setloading, song, setSong}}>
            {children}
        </SongContext.Provider>
    )
}