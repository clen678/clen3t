import { FaSortDown } from "react-icons/fa";
import { useState, useContext } from "react";
import GameContext from "../context/GameContext";

const ModelDropdown = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { setAiModel } = useContext(GameContext);
    const [selectedModel, setSelectedModel] = useState("GPT 4o");

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    // grabs the id of the selected currency from the selection and sets it as the selected currency
    const handleSelect = (event) => {
        const { id } = event.target;
        setDisplayModel(id);
        setIsOpen(false);
        setAiModel(id);
    };

    const setDisplayModel = (id) => {
        switch (id) {
            case "GPT4O":
                setSelectedModel("GPT 4o");
                break;
            case "GPTO1MINI":
                setSelectedModel("GPT o1-mini");
                break;
            case "GEMINI":
                setSelectedModel("Gemini");
                break;
        }
    }
    
    return ( 
        <div className="relative">
            <button className={`bg-primary-background-lighter px-3 min-h-[30px] min-w-[140px] hover:bg-primary-background-lighter active:bg-primary-background-light ${!isOpen ? 'rounded-lg' : 'rounded-tl-lg rounded-tr-lg'}`} onClick={handleOpen}>
                <div className="flex flex-row gap-2 justify-between">
                    {selectedModel}
                    {isOpen ? <FaSortDown /> : <FaSortDown className='origin-[90%][50%] -rotate-90 translate-y-[2px] -translate-x-[2px]' />}
                </div>
            </button>
            {isOpen && (
                <div className='z-50 absolute bg-primary-background-lighter flex flex-col min-w-[140px] items-start border-primary-background-lighter border-[2px] rounded-bl-lg rounded-br-lg' >
                    <form className="w-full">
                        <div className="w-full">
                            <input type="radio" id="GPT4O" className='peer hidden' onClick={handleSelect} />
                            <label htmlFor="GPT4O" className='w-[100%] px-3 select-none cursor-pointer inline-block text-primary-text py-1 bg-transparent hover:bg-primary-background-light'>
                                GPT 4o 
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="GPTO1MINI" className='peer hidden' onClick={handleSelect} />
                            <label htmlFor="GPTO1MINI" className='w-[100%] px-3 select-none cursor-pointer inline-block text-primary-text py-1 bg-transparent hover:bg-primary-background-light'>
                                GPT o1-mini
                            </label>
                        </div>
                        <div>
                            <input type="radio" id="GEMINI" className='peer hidden' onClick={handleSelect} />
                            <label htmlFor="GEMINI" className='w-[100%] px-3 select-none cursor-pointer inline-block text-primary-text py-1 bg-transparent hover:bg-primary-background-light hover:rounded-bl-lg hover:rounded-br-lg'>
                                Gemini
                            </label>
                        </div>
                    </form>
                </div>

            )}
        </div>
     );
}
 
export default ModelDropdown;