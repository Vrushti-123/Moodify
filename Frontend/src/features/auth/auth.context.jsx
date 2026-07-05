import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [User, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    // Ye sirf ek baar chalega jab poori app load hoti hai (AuthProvider App.jsx
    // ke root pe hai, so ye baar baar mount nahi hota jaise useAuth() karta tha)
    useEffect(() => {
        async function checkLoggedIn(){
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setloading(false);
            }
        }

        checkLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{User, setUser, loading, setloading}}>
            {children}
        </AuthContext.Provider>
    )
}