import { Link } from "react-router-dom";

const StdButton = ({text, link, colour, onClick}) => {


    return ( 
        <Link to={link}
            className={`flex items-center text-xl py-1 px-6 rounded-lg w-[7.5rem] justify-center max-md:text-lg max-md:w-[5.6rem] max-md:px-3 ${colour === "blue"
            ? "bg-primary-blue hover:bg-primary-blue-dark active:bg-primary-blue-darker"
            : "bg-primary-red hover:bg-primary-red-dark active:bg-primary-red-darker"
        }`}
        onClick={onClick}>{text}</Link>
     );
}
 
export default StdButton;