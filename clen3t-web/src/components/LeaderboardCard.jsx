import LoginContext from "../context/LoginContext";
import { useContext } from "react";

const LeaderboardCard = ({user}) => {
    
    const { currentUser } = useContext(LoginContext);
    const username = user.username;
    const score = user.highscore;

    return ( 
        <div className={`flex justify-between rounded-md px-6 py-1 ${ currentUser && currentUser.username == username ? `bg-[#e7b734] text-[#463712]` : `bg-primary-background-lighter`}`}>
            <p>{username}</p>
            <p>{score}</p>
        </div>
     );
}
 
export default LeaderboardCard;