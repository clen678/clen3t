import GameContext from "./GameContext.jsx"
import { useState, useEffect } from "react";
import api from '../api/axiosConfig'

export function GameContextProvider({ children }) {

    // const [currentUser, setCurrentUser] = useState();
    const [aiModel, setAiModel] = useState("GTP4O");
    const [aiStart, setAiStart] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [enableBypass, setEnableBypass] = useState(false);



    const contextValue = {
        aiModel,
        aiStart,
        setAiModel,
        setAiStart,
        showModal,
        setShowModal,
        enableBypass,
        setEnableBypass,
    }

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}

export default GameContextProvider;