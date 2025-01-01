import GameContext from "./GameContext.jsx"
import { useState, useEffect } from "react";
import api from '../api/axiosConfig'

export function GameContextProvider({ children }) {

    // const [currentUser, setCurrentUser] = useState();
    const [aiModel, setAiModel] = useState("GTP4O");



    const contextValue = {
        aiModel,
        setAiModel,
    }

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}

export default GameContextProvider;