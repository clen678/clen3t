import StdButton from  "../components/StdButton.jsx"

const Header = ({ username }) => {


    return (
        <div className="w-full h-[10%] px-[10%] flex items-center justify-between">

            <div>
                <h1 className="text-4xl">tic tac toe.</h1>
                <h2 className="text-2xl ">clen3t</h2>
            </div>

            <div className="flex flex-row gap-8 items-center">
                <h2 className="text-2xl ">{username}</h2>
                <StdButton text={"Sign In"} link={"/"}></StdButton>
            </div>

        </div>
    );
}

export default Header;