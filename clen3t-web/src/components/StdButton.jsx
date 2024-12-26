import { Link } from "react-router-dom";

const StdButton = ({text, link}) => {



    return ( 
        <Link to={link} className="bg-primary-red text-xl py-1 px-6 rounded-lg hover:bg-primary-red-dark active:bg-primary-red-darker w-[7.5rem] text-center">{text}</Link>
     );
}
 
export default StdButton;