import { useState } from "react";

import { createContext } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({children}) => {
    
    const [song, setSong] = useState(null);
    const [loading, setloading] = useState(false);
    const [playlist, setPlaylist] = useState([]);

    return (
        <SongContext.Provider value={{loading, setloading, song, setSong, playlist, setPlaylist}}>
            {children}
        </SongContext.Provider>
    )
}