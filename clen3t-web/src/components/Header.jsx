import StdButton from "../components/StdButton.jsx"
import LoginContext from "../context/LoginContext";
import { useContext } from "react";

const Header = ({ username }) => {

    const { setCurrentUser, currentUser } = useContext(LoginContext);

    const signOut = () => {
        setCurrentUser();
    }

    return (
        <div className="w-full h-[10%] px-[10%] flex items-center justify-between">

            <div>
                <h1 className="text-4xl">tic tac toe.</h1>
                <h2 className="text-2xl ">clen3t</h2>
            </div>

            <div className="flex flex-row gap-8 items-center">
                <h2 className="text-2xl ">{username}</h2>
                {currentUser
                    ? (
                        <button className="text-xl py-1 px-6 rounded-lg w-[7.5rem] text-center bg-primary-red hover:bg-primary-red-dark active:bg-primary-red-darker" onClick={signOut}>Sign Out</button>
                    )
                    : (
                        <StdButton text={"Sign In"} link={"/login"}></StdButton>
                    )}
            </div>

        </div>
    );
}

export default Header;