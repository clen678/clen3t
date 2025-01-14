import StdButton from "../components/StdButton.jsx"
import LoginContext from "../context/LoginContext";
import { useContext } from "react";

const Header = ({ username }) => {

    const { setCurrentUser, currentUser } = useContext(LoginContext);

    const signOut = () => {
        setCurrentUser();
    }

    return (
        <div className="w-full h-[10%] px-[10%] flex items-center justify-between max-md:mb-6">

            <div>
                <h1 className="text-4xl max-md:text-xl">tic tac toe.</h1>
                <h2 className="text-2xl max-md:text-lg">clen3t</h2>
            </div>

            <div className="flex flex-row gap-8 items-center max-md:gap-4">
                <h2 className="text-2xl max-md:text-lg">{username}</h2>
                {currentUser
                    ? (
                        <button className="text-xl py-1 px-6 rounded-lg w-[7.5rem] text-center bg-primary-red hover:bg-primary-red-dark active:bg-primary-red-darker max-md:text-lg max-md:w-[5.6rem] max-md:px-3" onClick={signOut}>Sign Out</button>
                    )
                    : (
                        <StdButton text={"Sign In"} link={"/login"}></StdButton>
                    )}
            </div>

        </div>
    );
}

export default Header;