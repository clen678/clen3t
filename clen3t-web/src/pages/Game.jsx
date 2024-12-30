import Header from "../components/Header";
import Footer from "../components/Footer";
import StdButton from "../components/StdButton";
import { useEffect, useState, useContext } from "react";
import api from '../api/axiosConfig'
import LeaderboardCard from "../components/LeaderboardCard";
import LoginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Game = () => {

    // const [username, setUsername] = useState("Guest");
    const [turn, setTurn] = useState("Your Turn")
    const background = "bg-primary-background-light rounded-lg px-5 py-3"
    const menuText = "text-xl"
    const navigate = useNavigate();

    const [users, setUsers] = useState();
    const { currentUser, deleteUser } = useContext(LoginContext);

    const [XTL, setXTL] = useState(false);
    const [XTM, setXTM] = useState(false);
    const [XTR, setXTR] = useState(false);
    const [XML, setXML] = useState(false);
    const [XMM, setXMM] = useState(false);
    const [XMR, setXMR] = useState(false);
    const [XBL, setXBL] = useState(false);
    const [XBM, setXBM] = useState(false);
    const [XBR, setXBR] = useState(false);

    const [board, setBoard] = useState({
        grid: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        winner: null
    })

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await api.get("/api/users");
          setUsers(response.data);
          console.log("fetched users:", response.data);
            console.log("current user is:", currentUser)
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    }, [currentUser]);

    const sendBoard = async () => {
        try {
            const response = await api.post("/api/board");
            setBoard(response.data);
            console.log("fetched board:", response.data);
        } catch (error) {
            console.error("Error sending board:", error);
        }
    };

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
                                <div className="z-50 bg-transparent h-full aspect-1 rounded-lg hover:bg-[#4e4e4e42] hover:cursor-pointer transition-all" onClick={()=>{setXTL(true)}}/>
                                <div className="z-50 bg-transparent h-full aspect-1 rounded-lg hover:bg-[#4e4e4e42] hover:cursor-pointer transition-all" onClick={() => setXTM(true)} />
                                <div className="z-50 bg-transparent h-full aspect-1 rounded-lg hover:bg-[#4e4e4e42] hover:cursor-pointer transition-all" onClick={() => setXTR(true)} />
                                <div className="z-50 bg-transparent h-full aspect-1 rounded-lg hover:bg-[#4e4e4e42] hover:cursor-pointer transition-all" onClick={() => setXML(true)} />
                                <div className="z-50 bg-transparent h-full aspect-1 rounded-lg hover:bg-[#4e4e4e42] hover:cursor-pointer transition-all" onClick={() => setXMM(true)} />
                                <div className="z-50 bg-transparent h-full aspect-1 rounded-lg hover:bg-[#4e4e4e42] hover:cursor-pointer transition-all" onClick={() => setXMR(true)} />
                                <div className="z-50 bg-transparent h-full aspect-1 rounded-lg hover:bg-[#4e4e4e42] hover:cursor-pointer transition-all" onClick={() => setXBL(true)} />
                                <div className="z-50 bg-transparent h-full aspect-1 rounded-lg hover:bg-[#4e4e4e42] hover:cursor-pointer transition-all" onClick={() => setXBM(true)} />
                                <div className="z-50 bg-transparent h-full aspect-1 rounded-lg hover:bg-[#4e4e4e42] hover:cursor-pointer transition-all" onClick={() => setXBR(true)} />
                            </div>

                            <div className="absolute bg-[#86353500] w-[85%] aspect-1 gap-[2%] grid items-center justify-items-center grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr]">
                                <div className={CTL ? `text-primary-text` : `text-transparent`}><RxCross2 size={150}/></div>
                                <div className={CTM ? `text-primary-text` : `text-transparent`}><RxCross2 size={150} /></div>
                                <div className={CTR ? `text-primary-text` : `text-transparent`}><RxCross2 size={150} /></div>
                                <div className={CML ? `text-primary-text` : `text-transparent`}><RxCross2 size={150} /></div>
                                <div className={CMM ? `text-primary-text` : `text-transparent`}><RxCross2 size={150} /></div>
                                <div className={CMR ? `text-primary-text` : `text-transparent`}><RxCross2 size={150} /></div>
                                <div className={CBL ? `text-primary-text` : `text-transparent`}><RxCross2 size={150} /></div>
                                <div className={CBM ? `text-primary-text` : `text-transparent`}><RxCross2 size={150} /></div>
                                <div className={CBR ? `text-primary-text` : `text-transparent`}><RxCross2 size={150} /></div>
                            </div>
                
                        </div>

                        <div className="flex justify-between">
                            <p className="text-xl py-1 px-8 rounded-lg bg-primary-background-light text-center">{turn}</p>
                            <StdButton text={"Confirm"} colour={"blue"}></StdButton>
                        </div>
                    </div>

                    {/* right pannel */}
                    <div className="flex flex-col w-[50%] gap-5">

                        {/* settings */}
                        <div className={`h-[40%] ${background} grid grid-rows-[40px_1fr_1fr]`}>
                            <h1 className={menuText}>Settings:</h1>
                            <div className="flex flex-col gap-[5%] justify-between">
                                    <p>setting 1</p>
                                    <p>setting 2</p>
                                    <p>setting 3</p>
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