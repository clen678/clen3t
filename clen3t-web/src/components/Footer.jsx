import { IoInformationCircle } from "react-icons/io5";

const Footer = () => {

    const handleClick = () => {
        alert("Tech stack: \nReactJS,\nSpring Boot,\nMongoDB,\nTailwind CSS\n\nJava,\nJavascript,\nHTML/CSS")
    }

    return ( 
        <div className="mx-[1%] display flex justify-between items-end w-full mt-auto py-2 px-4">
            <p>github.com/clen678</p>
            <button className="hover:text-primary-blue active:text-primary-blue-darker" onClick={handleClick}>
                <IoInformationCircle size={22} />
            </button>
        </div>
     );
}
 
export default Footer;