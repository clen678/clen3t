import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Start = () => {
    
    
    
    return ( 
        <div className="w-full h-screen text-primary-text font-serif font-semibold flex flex-col">
            
            {/* content */}
            <div className="flex flex-col items-center h-full">

                <div className="mt-[10%] w-[75%] h-[45%] flex flex-col items-center justify-between max-lg:mt-[20%]">
                    <div>
                        <h1 className="text-8xl max-md:text-6xl">tic tac toe.</h1>
                        <h2 className="text-6xl max-md:text-4xl">clen3t</h2>
                    </div>

                    <div className="flex justify-center max-lg:mt-[50%]">
                        <Link to={"/game"} className="bg-primary-red px-10 py-3 rounded-lg text-3xl hover:bg-primary-red-dark active:bg-primary-red-darker max-lg:text-2xl">Start</Link>
                    </div>
                </div>
                
                <Footer/>
            </div>
        </div>

     );
}
 
export default Start;