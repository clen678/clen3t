import Header from "../components/Header";
import Footer from "../components/Footer";
import StdButton from "../components/StdButton";
import { useEffect, useState } from "react";

const Game = () => {

    const [username, setUsername] = useState("Guest");

    return ( 
        <div className="bg-primary-background w-full h-screen text-primary-text font-serif font-semibold">
            
            {/* content */}
            <div className="h-[96%] flex flex-col items-center">
                <Header username={username} />

                <div className="flex justify-between bg-slate-900 w-[50%] h-[80%] gap-5">

                    <div className="flex flex-col bg-slate-700 gap-5">
                        <div className="bg-blue-500 aspect-1 h-[90%]">
                            <h1>game</h1>
                        </div>

                        <div className="flex justify-between bg-slate-400">
                            <StdButton text={"You"}></StdButton>
                            <StdButton text={"Confirm"}></StdButton>
                        </div>
                    </div>

                    <div className="flex flex-col bg-red-900 w-full gap-5">
                        <div className="bg-green-950 h-[45%]">
                            <h1>223</h1>
                        </div>

                        <div className="bg-orange-950 h-[55%]">
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