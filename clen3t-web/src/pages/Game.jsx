import Header from "../components/Header";
import Footer from "../components/Footer";
import StdButton from "../components/StdButton";
import { useEffect, useState } from "react";

const Game = () => {

    const [username, setUsername] = useState("Guest");
    const [turn, setTurn] = useState("Your turn")

    return ( 
        <div className="bg-primary-background w-full h-screen text-primary-text font-serif font-semibold">
            
            {/* content */}
            <div className="h-[96%] flex flex-col items-center">
                <Header username={username} />

                <div className="flex justify-between w-[50%] gap-5">

                    <div className="flex flex-col gap-5 w-[100%]">
                        <div className="bg-primary-background-light aspect-1 rounded-lg">
                            <h1>game</h1>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-xl py-1 px-8 rounded-lg bg-primary-background-light text-center">{turn}</p>
                            <StdButton text={"Confirm"} colour={"blue"}></StdButton>
                        </div>
                    </div>

                    <div className="flex flex-col w-[50%] gap-5">
                        <div className="bg-primary-background-light h-[45%] rounded-lg">
                            <h1>223</h1>
                        </div>

                        <div className="bg-primary-background-light h-[55%] rounded-lg">
                            <h1>223</h1>
                        </div>
                    </div>

                </div>


            </div>

            <Footer />
        </div>
     );
}
 
export default Game;