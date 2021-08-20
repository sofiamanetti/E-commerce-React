import React,{useState} from "react"
import EcommerceContext from "./EcommerceContext"

function GlobalState({children}){
    const [userLogin,setUserLogin]= useState(localStorage.getItem("login"));
    const [userLogout,setUserLogout] =useState(false);
    const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const loginUser = (user)=>{
        setUserLogin(true)
        localStorage.setItem("login",true)
        setUserInfo(user)
        localStorage.setItem("user",JSON.stringify(user))
    }
    const logoutUser = (user)=>{
        setUserLogin(false)
        setUserInfo()
        setUserLogout()
        localStorage.removeItem("login")
        localStorage.removeItem("user")
    }
    return(
        <EcommerceContext.Provider
           value={{
               userLogin,
               loginUser,
               userLogout,
               logoutUser,
               userInfo,
           }}
        
        >
          {children}
        </EcommerceContext.Provider>
    ) 
}
export default GlobalState