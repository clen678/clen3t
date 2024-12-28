import LoginContext from "./LoginContext.jsx"
import { useState, useEffect } from "react";
import api from '../api/axiosConfig'

export function LoginContextProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();

    const deleteUser = async () => {
        console.log("deeitng id", currentUser.username, currentUser._id)
        try {
            const response = await api.delete(`/api/users/${currentUser._id}`);
            console.log("deleted user:", response.data);
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