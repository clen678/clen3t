import LoginContext from "./LoginContext.jsx"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig'

export function LoginContextProvider({ children }) {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();

    const deleteUser = async () => {
        console.log("deleting id", currentUser.username, currentUser.userId)
        try {
            const response = await api.delete(`/api/users/${currentUser.userId}`);
            setCurrentUser();
        } catch (error) {
            console.error("Error deleting users:", error);
        }
    }


    const contextValue = {
        currentUser,
        setCurrentUser,
        deleteUser,
    }

    return ( 
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
     );
}
 
export default LoginContextProvider;