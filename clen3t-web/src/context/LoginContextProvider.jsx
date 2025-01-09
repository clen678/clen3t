import LoginContext from "./LoginContext.jsx"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig'

// RENAME THIS TO GAME CONTEXT OR SOMETHING
export function LoginContextProvider({ children }) {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();
    const [userScore, setUserScore] = useState();
    const [users, setUsers] = useState();
    const [winner, setWinner] = useState(0); //0 1 2 3

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/api/users");
                setUsers(response.data);
                console.log("fetched users:", response.data);
                console.log("current user is:", currentUser);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [currentUser]);

    const deleteUser = async () => {
        console.log("deleting id", currentUser.username, currentUser.userId);
        try {
            const response = await api.delete(`/api/users/${currentUser.userId}`);
            setCurrentUser();
        } catch (error) {
            console.error("Error deleting users:", error);
        }
    }

    const updateUserScore = async (winner) => {
        if (currentUser) {

            let newScore = 0;
            if (winner === 1) {
                newScore = 25;
            } else if (winner === 2) {
                newScore = -25;
            }

            try {
                currentUser.highscore = currentUser.highscore + newScore;
                const response = await api.put(`/api/users/${currentUser.userId}`, currentUser);
                setCurrentUser(response.data);
                console.log("updated user:", response.data);
            } catch (error) {
                console.error("Error updating users:", error);
            }
        }
    }

    const contextValue = {
        users,
        currentUser,
        winner,
        setCurrentUser,
        setUsers,
        deleteUser,
        setWinner,
        updateUserScore,
    }

    return ( 
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
     );
}
 
export default LoginContextProvider;