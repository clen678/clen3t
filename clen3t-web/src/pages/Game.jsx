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
    const menuText = "text-xl max-md:text-lg"
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

    const [selectedMove, setSelectedMove] = useState();

    const [board, setBoard] = useState({
        grid: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        winner: null,
        model: "GPT4O" //GPT40, GPTO1, GEMINI
    })

    let unconfirmedGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // updates board from player input
    const updatePlayerBoard = (selected) => {
        resetUnconfirmed();
        setLoading(true);
        setEnableGrid(false);
        if (selected === 'XTL') {
            setXTL(true);
            board.grid[0][0] = 1;
        } else if (selected === 'XTM') {
            setXTM(true);
            board.grid[0][1] = 1;
        } else if (selected === 'XTR') {
            setXTR(true);
            board.grid[0][2] = 1;
        } else if (selected === 'XML') {
            setXML(true);
            board.grid[1][0] = 1;
        } else if (selected === 'XMM') {
            setXMM(true);
            board.grid[1][1] = 1;
        } else if (selected === 'XMR') {
            setXMR(true);
            board.grid[1][2] = 1;
        } else if (selected === 'XBL') {
            setXBL(true);
            board.grid[2][0] = 1;
        } else if (selected === 'XBM') {
            setXBM(true);
            board.grid[2][1] = 1;
        } else if (selected === 'XBR') {
            setXBR(true);
            board.grid[2][2] = 1;
        }

        console.log("sending board to server with model: ", aiModel);
        console.log("grid: ", board.grid);
        board.model = aiModel;
        sendBoard(board);
    } 

    // updates board from player input
    const displayUnfonfirmedMove = (placed) => {

        resetUnconfirmed();

        if (placed === 'XTL') {
            setUXTL(true);
        } else if (placed === 'XTM') {
            setUXTM(true);
        } else if (placed === 'XTR') {
            setUXTR(true);
        } else if (placed === 'XML') {
            setUXML(true);
        } else if (placed === 'XMM') {
            setUXMM(true);
        } else if (placed === 'XMR') {
            setUXMR(true);
        } else if (placed === 'XBL') {
            setUXBL(true);
        } else if (placed === 'XBM') {
            setUXBM(true);
        } else if (placed === 'XBR') {
            setUXBR(true);
        }
        setSelectedMove(placed);
        console.log("setting unconfirmed grid");
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
            unconfirmedGrid = response.data.grid;
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
            } else if (winner === 4) {
                setWinner(3);
                setTurn("AI Error")
            }

            setEnableGrid(false);
            updateUserScore(winner);
        }
    }

    // reset grid and give ai 1 move when aistart is turned on
    useEffect(() => {
        console.log("ai model is:", aiModel)
        restartGame(); // doesnt seem to be restarting before board is sent

        if (aiStart) {
            setTurn("AI's Turn");
            console.log("sending board with aistart:", aiStart, board);
            sendBoard(board);
        }
    }, [aiStart]);

    const restartGame = () => {
        console.log("restarting game",aiModel)
        resetUnconfirmed();
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

        // reset the board state
        setBoard({
            grid: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            winner: null,
            model: aiModel // for some reason this isnt set when turning AiStart on with server populated board
        });
        
        setEnableGrid(true);
        setWinner(0);
        setTurn("Your Turn");
    }

    const resetUnconfirmed = () => {
        setUXTL(false);
        setUXTM(false);
        setUXTR(false);
        setUXML(false);
        setUXMM(false);
        setUXMR(false);
        setUXBL(false);
        setUXBM(false);
        setUXBR(false);
    }

    return ( 
        <div className=" w-full h-screen text-primary-text font-serif font-semibold flex flex-col">
            <div className="flex-grow overflow-y-auto">

                {/* content */}
                <div className="h-full flex flex-col items-center">
                    <Header username={currentUser ? currentUser.username : "Guest"} />

                    <div className="flex justify-between gap-5 max-2xl:w-[70%] max-xl:w-[80%] max-md:flex-col max-md:w-[70%]">

                        {/* left pannel */}
                        <div className="flex flex-col gap-5 w-[100%]">
                            <div className="relative bg-primary-background-light aspect-1 rounded-lg flex justify-center items-center">
                                <img src={require("../assets/grid.svg").default} alt="Game grid" className="size-[90%]" draggable="false" />

                                <div className="absolute bg-[#86353500] w-[85%] aspect-1 gap-[2%] grid items-center justify-items-center grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr]">
                                    <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XTL || CTL || UXTL || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XTL || CTL || !enableGrid) ? null : () => displayUnfonfirmedMove('XTL')} />
                                    <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XTM || CTM || UXTM || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XTM || CTM || !enableGrid) ? null : () => displayUnfonfirmedMove('XTM')} />
                                    <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XTR || CTR || UXTR || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XTR || CTR || !enableGrid) ? null : () => displayUnfonfirmedMove('XTR')} />
                                    <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XML || CML || UXML || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XML || CML || !enableGrid) ? null : () => displayUnfonfirmedMove('XML')} />
                                    <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XMM || CMM || UXMM || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XMM || CMM || !enableGrid) ? null : () => displayUnfonfirmedMove('XMM')} />
                                    <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XMR || CMR || UXMR || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XMR || CMR || !enableGrid) ? null : () => displayUnfonfirmedMove('XMR')} />
                                    <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XBL || CBL || UXBL || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XBL || CBL || !enableGrid) ? null : () => displayUnfonfirmedMove('XBL')} />
                                    <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XBM || CBM || UXBM || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XBM || CBM || !enableGrid) ? null : () => displayUnfonfirmedMove('XBM')} />
                                    <div className={`z-50 bg-transparent h-full aspect-1 rounded-lg ${!(XBR || CBR || UXBR || !enableGrid) ? 'hover:bg-[#4e4e4e42] hover:cursor-pointer' : ''} transition-all`} onClick={(XBR || CBR || !enableGrid) ? null : () => displayUnfonfirmedMove('XBR')} />
                                </div>

                                {/* confirmed player moves */}
                                <div className="absolute z-49 bg-[#86353500] w-[85%] aspect-1 gap-[2%] text-[9vw] grid items-center justify-items-center grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] max-xl:text-[12vw] max-md:text-[17vw]">
                                    <div className={XTL ? `text-primary-text` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={XTM ? `text-primary-text` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={XTR ? `text-primary-text` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={XML ? `text-primary-text` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={XMM ? `text-primary-text` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={XMR ? `text-primary-text` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={XBL ? `text-primary-text` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={XBM ? `text-primary-text` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={XBR ? `text-primary-text` : `text-transparent`}><IoCloseOutline /></div>
                                </div>

                                {/* unconfirmed player move */}
                                <div className="absolute z-5 bg-[#86353500] w-[85%] aspect-1 gap-[2%] text-[9vw] grid items-center justify-items-center grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] max-xl:text-[12vw] max-md:text-[17vw]">
                                    <div className={UXTL ? `text-primary-background-lighter` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={UXTM ? `text-primary-background-lighter` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={UXTR ? `text-primary-background-lighter` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={UXML ? `text-primary-background-lighter` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={UXMM ? `text-primary-background-lighter` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={UXMR ? `text-primary-background-lighter` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={UXBL ? `text-primary-background-lighter` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={UXBM ? `text-primary-background-lighter` : `text-transparent`}><IoCloseOutline /></div>
                                    <div className={UXBR ? `text-primary-background-lighter` : `text-transparent`}><IoCloseOutline /></div>
                                </div>

                                <div className="absolute bg-[#86353500] w-[85%] aspect-1 gap-[2%] text-[7vw] grid items-center justify-items-center grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] max-xl:text-[9vw] max-md:text-[14vw]">
                                    <div className={CTL ? `text-primary-text` : `text-transparent`}><RxCircle /></div>
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
                                <p className={`py-1 px-6 min-w-[33%] rounded-lg bg-primary-background-light text-center max-md:text-lg max-md:min-w-[50%]`}>{turn}</p>
                                {winner === 0
                                    ?
                                    <StdButton text={"Confirm"} colour={"blue"} onClick={() => { updatePlayerBoard(selectedMove) }}></StdButton>
                                    :
                                    <StdButton text={"Restart"} colour={"blue"} onClick={restartGame}></StdButton>}
                            </div>
                        </div>

                        {/* right pannel */}
                        <div className="flex flex-col w-[50%] gap-5 max-md:flex-col max-md:w-full max-md:justify-between">

                            {/* settings */}
                            <div className={`h-[40%] ${background} grid grid-rows-[40px_1fr_1fr] max-md:w-full max-md:h-[200px]`}>
                                <h1 className={menuText}>Settings:</h1>
                                <div className="flex flex-col gap-[6px] justify-between">
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
                            <div className={`h-[60%] ${background} grid grid-rows-[40px_6fr] min-h-0 max-md:w-full max-md:h-full`}>
                                <h1 className={menuText}>Leaderboard:</h1>

                                <div className="flex-grow h-[98%] flex flex-col gap-2 overflow-x-hidden overflow-y-scroll rounded-md scrollbar-track-transparent scrollbar-thumb-primary-background-lighter scrollbar-thumb-rounded-full scrollbar-thin">
                                    {users && users.length > 0
                                        ? users
                                            .filter(user => user.highscore !== 0)
                                            .sort((a, b) => b.highscore - a.highscore)
                                            .map((user) => (<LeaderboardCard key={user.userId} user={user} />))
                                        : <p>No users found</p>}
                                </div>

                            </div>
                        </div>

                    </div>
                <Footer />
                </div>
            </div>

        </div>
     );
}
 
export default Game;