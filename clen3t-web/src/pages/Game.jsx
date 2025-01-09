import Header from "../components/Header";
import Footer from "../components/Footer";
import StdButton from "../components/StdButton";
import { useEffect, useState, useContext } from "react";
import api from '../api/axiosConfig'
import LeaderboardCard from "../components/LeaderboardCard";
import LoginContext from "../context/LoginContext";
import GameContext from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { RxCircle } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import ModelDropdown from "../components/ModelDropdown";
import ToggleSlider from "../components/ToggleSlider";

const Game = () => {

    const [turn, setTurn] = useState("Your Turn")
    const background = "bg-primary-background-light rounded-lg px-5 py-3"
    const menuText = "text-xl"
    const navigate = useNavigate();

    // const [users, setUsers] = useState();
    const { currentUser, deleteUser, users, updateUserScore, winner, setWinner } = useContext(LoginContext);
    const { aiModel, aiStart } = useContext(GameContext);
    const [loading, setLoading] = useState(false);
    const [enableGrid, setEnableGrid] = useState(true);

    const [XTL, setXTL] = useState(false);
    const [XTM, setXTM] = useState(false);
    const [XTR, setXTR] = useState(false);
    const [XML, setXML] = useState(false);
    const [XMM, setXMM] = useState(false);
    const [XMR, setXMR] = useState(false);
    const [XBL, setXBL] = useState(false);
    const [XBM, setXBM] = useState(false);
    const [XBR, setXBR] = useState(false);

    const [CTL, setCTL] = useState(false);
    const [CTM, setCTM] = useState(false);
    const [CTR, setCTR] = useState(false);
    const [CML, setCML] = useState(false);
    const [CMM, setCMM] = useState(false);
    const [CMR, setCMR] = useState(false);
    const [CBL, setCBL] = useState(false);
    const [CBM, setCBM] = useState(false);
    const [CBR, setCBR] = useState(false);

    const [UXTL, setUXTL] = useState(false);
    const [UXTM, setUXTM] = useState(false);
    const [UXTR, setUXTR] = useState(false);
    const [UXML, setUXML] = useState(false);
    const [UXMM, setUXMM] = useState(false);
    const [UXMR, setUXMR] = useState(false);
    const [UXBL, setUXBL] = useState(false);
    const [UXBM, setUXBM] = useState(false);
    const [UXBR, setUXBR] = useState(false);

    const [board, setBoard] = useState({
        grid: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        winner: null,
        model: "GPT4O" //GPT40, GPTO1, GEMINI
    })

    const [unconfirmedGrid, setUnconfirmedGrid] = useState ([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]);

    // updates board from player input
    const updatePlayerBoard = (placed) => {
        setLoading(true);
        setEnableGrid(false);
        if (placed === 'XTL') {
            setXTL(true);
            board.grid[0][0] = 1;
        } else if (placed === 'XTM') {
            setXTM(true);
            board.grid[0][1] = 1;
        } else if (placed === 'XTR') {
            setXTR(true);
            board.grid[0][2] = 1;
        } else if (placed === 'XML') {
            setXML(true);
            board.grid[1][0] = 1;
        } else if (placed === 'XMM') {
            setXMM(true);
            board.grid[1][1] = 1;
        } else if (placed === 'XMR') {
            setXMR(true);
            board.grid[1][2] = 1;
        } else if (placed === 'XBL') {
            setXBL(true);
            board.grid[2][0] = 1;
        } else if (placed === 'XBM') {
            setXBM(true);
            board.grid[2][1] = 1;
        } else if (placed === 'XBR') {
            setXBR(true);
            board.grid[2][2] = 1;
        }

        console.log("sending board to server with model: ", aiModel);
        board.model = aiModel;
        sendBoard(board);
    } 

    // renders the board as per server's input
    const updateServerBoard = (serverBoard) => {
        console.log("updating server oard")
        if (serverBoard.grid[0][0] === 2) {
            setCTL(true);
        } 
        if (serverBoard.grid[0][1] === 2) {
            setCTM(true);
        } 
        if (serverBoard.grid[0][2] === 2) {
            setCTR(true);
        } 
        if (serverBoard.grid[1][0] === 2) {
            setCML(true);
        } 
        if (serverBoard.grid[1][1] === 2) {
            setCMM(true);
        } 
        if (serverBoard.grid[1][2] === 2) {
            setCMR(true);
        } 
        if (serverBoard.grid[2][0] === 2) {
            setCBL(true);
        } 
        if (serverBoard.grid[2][1] === 2) {
            setCBM(true);
        } 
        if (serverBoard.grid[2][2] === 2) {
            setCBR(true);
        }
    }

    const sendBoard = async (updatedBoard) => {
        try {
            const response = await api.post("/api/board", updatedBoard);
            setBoard(response.data);
            console.log("fetched board:", response.data);
            updateServerBoard(response.data);
            setLoading(false);
            setEnableGrid(true);
            setTurn("Your Turn");
        
            checkWinner(response.data.winner);

        } catch (error) {
            console.error("Error sending board:", error);
        }
    };

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setTurn(prevTurn => {
                    if (prevTurn === "AI's Turn") return "AI's Turn.";
                    if (prevTurn === "AI's Turn.") return "AI's Turn..";
                    if (prevTurn === "AI's Turn..") return "AI's Turn...";
                    return "AI's Turn";
                });
            }, 500);

            return () => clearInterval(interval); // Cleanup interval on component unmount or when loading changes
        }
    }, [loading]);

    const checkWinner = (winner) => {
        if (winner !== 0) {
            if (winner === 1) {
                setWinner(1);
                setTurn("You Won!");
            } else if (winner === 2) {
                setWinner(2);
                setTurn("AI Won");
            } else if (winner === 3) {
                setWinner(3);
                setTurn("Tie")
            }

            setEnableGrid(false);
            updateUserScore(winner);
        }
    }

    // reset grid and give ai 1 move when aistart is turned on
    useEffect(() => {
        restartGame();

        if (aiStart) {
            sendBoard(board)
            console.log("sending board with aistart:", aiStart)
        }
    }, [aiStart]);

    const restartGame = () => {
        console.log("restarting game")
        setXTL(false);
        setXTM(false);
        setXTR(false);
        setXML(false);
        setXMM(false);
        setXMR(false);
        setXBL(false);
        setXBM(false);
        setXBR(false);
        setCTL(false);
        setCTM(false);
        setCTR(false);
        setCML(false);
        setCMM(false);
        setCMR(false);
        setCBL(false);
        setCBM(false);
        setCBR(false);

        // Reset the board state
        setBoard({
            grid: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            winner: null,
            model: aiModel
        });

        setEnableGrid(true);
        setWinner(0);
        setTurn("Your Turn");
    }

    return ( 
        <div className="bg-primary-background w-full h-screen text-primary-text font-serif font-semibold">
            
            {/* content */}
            <div className="h-[96%] flex flex-col items-center">
                <Header username={currentUser ? currentUser.username : "Guest"} />

                <div className="flex justify-between w-[50%] gap-5">

                    {/* left pannel */}
                    <div className="flex flex-col gap-5 w-[100%]">
                        <div className="relative bg-primary-background-light aspect-1 rounded-lg flex justify-center items-center">
                            <img src={require("../assets/grid.svg").default} alt="Game grid" className="size-[90%]" draggable="false" />

                            <div className="absolute bg-[#86353500] w-[85%] aspect-1 gap-[2%] grid items-center justify-items-center grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr]">
                                <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XTL || CTL || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XTL || CTL || !enableGrid) ? null : () => updatePlayerBoard('XTL')} />
                                <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XTM || CTM || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XTM || CTM || !enableGrid) ? null : () => updatePlayerBoard('XTM')} />
                                <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XTR || CTR || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XTR || CTR || !enableGrid) ? null : () => updatePlayerBoard('XTR')} />
                                <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XML || CML || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XML || CML || !enableGrid) ? null : () => updatePlayerBoard('XML')} />
                                <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XMM || CMM || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XMM || CMM || !enableGrid) ? null : () => updatePlayerBoard('XMM')} />
                                <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XMR || CMR || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XMR || CMR || !enableGrid) ? null : () => updatePlayerBoard('XMR')} />
                                <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XBL || CBL || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XBL || CBL || !enableGrid) ? null : () => updatePlayerBoard('XBL')} />
                                <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XBM || CBM || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XBM || CBM || !enableGrid) ? null : () => updatePlayerBoard('XBM')} />
                                <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XBR || CBR || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XBR || CBR || !enableGrid) ? null : () => updatePlayerBoard('XBR')} />
                            </div>

                            <div className="absolute bg-[#86353500] w-[85%] aspect-1 gap-[2%] text-[9vw] grid items-center justify-items-center grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr]">
                                <div className={XTL ? `text-primary-text` : `text-transparent`}><IoCloseOutline  /></div>
                                <div className={XTM ? `text-primary-text` : `text-transparent`}><IoCloseOutline  /></div>
                                <div className={XTR ? `text-primary-text` : `text-transparent`}><IoCloseOutline  /></div>
                                <div className={XML ? `text-primary-text` : `text-transparent`}><IoCloseOutline  /></div>
                                <div className={XMM ? `text-primary-text` : `text-transparent`}><IoCloseOutline  /></div>
                                <div className={XMR ? `text-primary-text` : `text-transparent`}><IoCloseOutline  /></div>
                                <div className={XBL ? `text-primary-text` : `text-transparent`}><IoCloseOutline  /></div>
                                <div className={XBM ? `text-primary-text` : `text-transparent`}><IoCloseOutline  /></div>
                                <div className={XBR ? `text-primary-text` : `text-transparent`}><IoCloseOutline  /></div>
                            </div>

                            <div className="absolute bg-[#86353500] w-[85%] aspect-1 gap-[2%] text-[7vw] grid items-center justify-items-center grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr]">
                                <div className={CTL ? `text-primary-text` : `text-transparent`}><RxCircle  /></div>
                                <div className={CTM ? `text-primary-text` : `text-transparent`}><RxCircle /></div>
                                <div className={CTR ? `text-primary-text` : `text-transparent`}><RxCircle /></div>
                                <div className={CML ? `text-primary-text` : `text-transparent`}><RxCircle /></div>
                                <div className={CMM ? `text-primary-text` : `text-transparent`}><RxCircle /></div>
                                <div className={CMR ? `text-primary-text` : `text-transparent`}><RxCircle /></div>
                                <div className={CBL ? `text-primary-text` : `text-transparent`}><RxCircle /></div>
                                <div className={CBM ? `text-primary-text` : `text-transparent`}><RxCircle /></div>
                                <div className={CBR ? `text-primary-text` : `text-transparent`}><RxCircle /></div>
                            </div>
                
                        </div>

                        <div className="flex justify-between">
                            <p className="text-xl py-1 px-6 min-w-[33%] rounded-lg bg-primary-background-light text-center">{turn}</p>
                            {winner === 0 
                            ? 
                                <StdButton text={"Confirm"} colour={"blue"}></StdButton>
                            :
                                <StdButton text={"Restart"} colour={"blue"} onClick={restartGame}></StdButton>}
                        </div>
                    </div>

                    {/* right pannel */}
                    <div className="flex flex-col w-[50%] gap-5">

                        {/* settings */}
                        <div className={`h-[40%] ${background} grid grid-rows-[40px_1fr_1fr]`}>
                            <h1 className={menuText}>Settings:</h1>
                            <div className="flex flex-col gap-[5%] justify-between">
                                <div className="flex justify-between items-center">
                                    <p>AI Model</p>
                                    <ModelDropdown />
                                </div>
                                <div className="flex justify-between items-center">
                                    <p>AI Start</p>
                                    <ToggleSlider />
                                </div>
                                    <p>setting 2</p>
                            </div>
                            <div className="justify-self-end self-end">
                                {currentUser && <button className=" hover:text-primary-red active:text-primary-red-darker mt-auto" onClick={deleteUser}>Delete Account</button>}
                            </div>
                        </div>

                        {/* leaderboard */}
                        <div className={`h-[60%] ${background} grid grid-rows-[40px_6fr] min-h-0`}>
                            <h1 className={menuText}>Leaderboard:</h1>

                            <div className="flex-grow h-[98%] flex flex-col gap-2 overflow-x-hidden overflow-y-scroll rounded-md scrollbar-track-transparent scrollbar-thumb-primary-background-lighter scrollbar-thumb-rounded-full scrollbar-thin">
                                {users && users.length > 0
                                    ? users
                                    .filter(user => user.highscore !== 0)
                                    .sort((a, b) => b.highscore - a.highscore)
                                    .map((user) => (<LeaderboardCard key={user.id} user={user} />))
                                    : <p>No users found</p>}
                            </div>

                        </div>
                    </div>

                </div>


            </div>

            <Footer />
        </div>
     );
}
 
export default Game;