import { Link } from "react-router-dom";

const StdButton = ({text, link, colour}) => {


    return ( 
        <Link to={link} className={`text-xl py-1 px-6 rounded-lg w-[7.5rem] text-center ${colour === "blue"
            ? "bg-primary-blue hover:bg-primary-blue-dark active:bg-primary-blue-darker"
            : "bg-primary-red hover:bg-primary-red-dark active:bg-primary-red-darker"
        }`}>{text}</Link>
     );
}
 
export default StdButton;