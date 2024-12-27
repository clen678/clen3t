import Header from "../components/Header";
import Footer from "../components/Footer";
import StdButton from "../components/StdButton";
import { useEffect, useState } from "react";
import api from '../api/axiosConfig'
import LeaderboardCard from "../components/LeaderboardCard";

const Game = () => {

    const [username, setUsername] = useState("Guest");
    const [turn, setTurn] = useState("Your turn")
    const background = "bg-primary-background-light rounded-lg px-5 pt-3"
    const menuText = "text-xl"

    const [users, setUsers] = useState();

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await api.get("/api/users");
          setUsers(response.data);
          console.log("fetched users:", response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    }, []);

    return ( 
        <div className="bg-primary-background w-full h-screen text-primary-text font-serif font-semibold">
            
            {/* content */}
            <div className="h-[96%] flex flex-col items-center">
                <Header username={username} />

                <div className="flex justify-between w-[50%] gap-5">

                    {/* left pannel */}
                    <div className="flex flex-col gap-5 w-[100%]">
                        <div className="bg-primary-background-light aspect-1 rounded-lg">
                            
                        </div>

                        <div className="flex justify-between">
                            <p className="text-xl py-1 px-8 rounded-lg bg-primary-background-light text-center">{turn}</p>
                            <StdButton text={"Confirm"} colour={"blue"}></StdButton>
                        </div>
                    </div>

                    {/* right pannel */}
                    <div className="flex flex-col w-[50%] gap-5">

                        {/* settings */}
                        <div className={`h-[45%] ${background}`}>
                            <h1 className={menuText}>Settings:</h1>
                        </div>

                        {/* leaderboard */}
                        <div className={`h-[55%] ${background}`}>
                            <h1 className={menuText}>Leaderboard:</h1>

                            <div className="flex flex-col gap-2 mt-4 overflow-x-hidden overflow-y-scroll h-[80%] rounded-md scrollbar-track-transparent scrollbar-thumb-primary-background-lighter scrollbar-thumb-rounded-full scrollbar-thin">
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