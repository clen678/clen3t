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

            let scoreUpdate = 0;
            if (winner === 1) {
                scoreUpdate = 25;
            } else if (winner === 2) {
                scoreUpdate = -25;
            }

            try {
                currentUser.highscore = currentUser.highscore + scoreUpdate;
                const response = await api.put(`/api/users/${currentUser.userId}`, currentUser);
                setCurrentUser(response.data);
                console.log("updated user with new score:", response.data);
            } catch (error) {
                console.error("Error updating users:", error);
            } finally {
                    incrementUserGamesPlayed();
            }
        } else {
            incrementGuestGamesPlayed();
            console.log("incremented guest games played");
        }
    }

    const incrementUserGamesPlayed = async () => {
        if (currentUser) {
            try {
                currentUser.gamesPlayed = currentUser.gamesPlayed + 1;
                const response = await api.put(`/api/users/${currentUser.userId}/increment`);
                setCurrentUser(response.data);
                console.log("updated user with new games played increment:", response.data);
            } catch (error) {
                console.error("Error updating users:", error);
            }
        }
    }

    // Local storage keys
    const LOCAL_GAMES_PLAYED_KEY = "guestGamesPlayed";
    const LOCAL_LAST_PLAYED_DATE_KEY = "guestLastPlayedDate";

    // Helper to get today's date as a string (YYYY-MM-DD)
    const getTodayString = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    // Track guest games played today
    const getGuestGamesPlayed = () => {
        const lastPlayed = localStorage.getItem(LOCAL_LAST_PLAYED_DATE_KEY);
        const today = getTodayString();
        if (lastPlayed !== today) {
            localStorage.setItem(LOCAL_LAST_PLAYED_DATE_KEY, today);
            localStorage.setItem(LOCAL_GAMES_PLAYED_KEY, "0");
            return 0;
        }
        return parseInt(localStorage.getItem(LOCAL_GAMES_PLAYED_KEY) || "0", 10);
    };

    const incrementGuestGamesPlayed = () => {
        const gamesPlayed = getGuestGamesPlayed() + 1;
        localStorage.setItem(LOCAL_GAMES_PLAYED_KEY, gamesPlayed.toString());
        };

    const validateCanPlay = () => {
        if (currentUser) {
            if (currentUser.gamesPlayed >= 3) {
                console.log("user has played 3 games, cannot play again");
                return false;
            } else {
                console.log("user can play again");
                return true;
            }
        } else {
            const guestGamesPlayed = getGuestGamesPlayed();
            if (guestGamesPlayed >= 3) {
                console.log("guest has played 3 games today, cannot play again");
                return false;
            } else {
                console.log("guest can play again");
                return true;
            }
        }
    };

    const contextValue = {
        users,
        currentUser,
        winner,
        setCurrentUser,
        setUsers,
        deleteUser,
        setWinner,
        updateUserScore,
        validateCanPlay,
        getGuestGamesPlayed,
    }

    return ( 
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
     );
}
 
export default LoginContextProvider;