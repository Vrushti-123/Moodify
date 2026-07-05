import { useContext } from "react";
import { getMe, login, logout, register } from "../services/auth.api";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext)

    const {User, setUser, loading, setloading} = context

    async function handleRegister({username, email, password}){
        setloading(true)

        try {
            const data = await register({ username, email, password });
            setUser(data.user);
        }
        //coz backend se "user" naam ka object bheja tha in response
        //so handleRegister humare register wale function (jo humne auth.api.js
        // mein banaya tha usko call karega and then aage badhega with the recieved resposne)
        catch (err) {
            console.log(err);
            throw err;
        } finally {
            setloading(false);
        }
    }

    async function handleLogin({username, email, password}){
        setloading(true)

            try {
                const data = await login({ username, email, password });
                setUser(data.user);
            } catch (err) {
                console.log(err);
                throw err;
            } finally {
                setloading(false);
            }
    }

    async function handleGetMe(){
        setloading(true)

        try {
            const data = await getMe();
            setUser(data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setloading(false);
        }
    }

    async function handleLogout(){
        setloading(true)

        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            setloading(false);
        }
    }


    /*

    useEffect(()=>{
        handleGetMe()
    },[])
    //taaki everytime we reload the page, user null set ho jaata hai,
    //so hume wapas se login page par redirect karta hai (coz protected)
    //so isse, refresh karne par logged in hi rahenge :)

    */

    return ({
        User, loading, handleLogin, handleRegister, handleGetMe, handleLogout
    })
    //ja par bhi useAuth ka use karenge waha par ye sabhi cheezo ka use/access kar sakte hai
}