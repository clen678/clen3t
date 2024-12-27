import LoginContext from "./LoginContext.jsx"
import { useState, useEffect } from "react";

export function LoginContextProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();


    const contextValue = {
        currentUser,
        setCurrentUser,
    }

    return ( 
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
     );
}
 
export default LoginContextProvider;