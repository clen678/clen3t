import { useContext, useState, useRef } from 'react';
import GameContext from "../context/GameContext";
import StdButton from './StdButton.jsx';

const Modal = () => {
    const { setShowModal, setEnableBypass } = useContext(GameContext);
    const [bypassPassword, setBypassPassword] = useState("");
    const [error, setError] = useState("");
    const modalContentRef = useRef(null);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleBypass = () => {
        // Replace 'letmein' with your actual bypass password
        if (bypassPassword === "letmein") {
            setError("");
            setEnableBypass(true);
            setShowModal(false);
        } else {
            setError("Incorrect password.");
        }
    };

    const handleBackgroundClick = (e) => {
        // Check if the click originated from the background div itself, and not from within the modal content
        if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
            handleClose();
        }
    };

    return (
        <div className="fixed text-white z-[100] top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center font-serif" onClick={handleBackgroundClick}>
            <div className="bg-primary-background-light rounded-lg px-5 py-6 shadow-lg max-w-md w-full flex flex-col items-center max-md:w-[90%]" ref={modalContentRef}>

                <h2 className="text-3xl max-md:text-lg mb-6 font-semibold">Oh no!</h2>
                <p className="mb-6 text-primary-text">You have reached your limit on the maximum games played for this account.</p>
                <div className="flex flex-col w-full gap-2 mb-6">
                    <input
                        type="password"
                        className="rounded px-3 py-2 text-primary-text bg-primary-background-lighter w-full border border-none focus:outline-none"
                        placeholder="Enter password to bypass"
                        value={bypassPassword}
                        onChange={e => setBypassPassword(e.target.value)}
                    />
                    <span className={error ? `text-red-400 text-sm` : `text-primary-background-light text-sm select-none`}>{error ? error : "secret"}</span>
                </div>
                <div className='flex justify-between w-full'>
                    <StdButton text={"Close"} colour={"red"} onClick={handleClose}></StdButton>
                    <StdButton text={"Continue"} colour={"blue"} onClick={handleBypass}></StdButton>
                </div>

            </div>
        </div>
    );
}

export default Modal;