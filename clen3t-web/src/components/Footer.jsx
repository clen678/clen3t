import { BsQuestionSquareFill } from "react-icons/bs";

const Footer = () => {

    const handleClick = () => {
        alert("Tech stack: ReactJS, Java Spring Boot, MongoDB")
    }

    return ( 
        <div className="mx-[1%] display flex justify-between items-end">
            <p>github.com/clen678</p>
            <button className="hover:text-primary-blue active:text-primary-blue-darker" onClick={handleClick}>
                <BsQuestionSquareFill size={20} />
            </button>
        </div>
     );
}
 
export default Footer;