import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Start = () => {
    
    
    
    return ( 
        <div className="bg-primary-background w-full h-screen text-primary-text font-serif font-semibold">
            <div className="flex justify-center h-[96%]">

                <div className="mt-[10%] w-[25%] h-[45%] flex flex-col justify-between">
                    <div>
                        <h1 className="text-8xl">tic tac toe.</h1>
                        <h2 className="text-6xl ">clen3t</h2>
                    </div>

                    <div className="flex justify-center">
                        <Link to={"/game"} className="bg-primary-red px-10 py-3 rounded-lg text-3xl hover:bg-primary-red-dark active:bg-primary-red-darker">Start</Link>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>

     );
}
 
export default Start;