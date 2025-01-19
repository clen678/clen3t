import { useState, useContext } from "react";
import GameContext from "../context/GameContext";

const ToggleSlider = ({ AI }) => {

    const { aiStart, setAiStart } = useContext(GameContext);
    const [on, setOn] = useState(false);

    const handleClick = () => {
        setOn(!on);
        
        if (AI) {
            setAiStart(!on);
        } else {
            //TODO other setting
        }
    }

    return ( 
        <div className={!on ? `relative bg-primary-background-lighter min-w-[60px] min-h-[30px] rounded-lg` : `relative bg-primary-background-lightish min-w-[60px] min-h-[30px] rounded-lg`}>
            <div className={!on ? `absolute bg-[#2a2c31] left-[3%] bottom-[6%] w-[26px] min-h-[26px] rounded-lg transition-all hover:cursor-pointer z-1` : `absolute bg-primary-text left-[3%] bottom-[6%] w-[26px] min-h-[26px] rounded-lg translate-x-[30px] transition-all hover:cursor-pointer`} onClick={handleClick}>

            </div>
        </div>
     );
}
 
export default ToggleSlider;