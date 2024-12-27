const LeaderboardCard = ({user}) => {
    
    const username = user.username;
    const score = user.highscore;

    return ( 
        <div className="flex justify-between bg-primary-background-lighter rounded-md px-6 py-1">
            <p>{username}</p>
            <p>{score}</p>
        </div>
     );
}
 
export default LeaderboardCard;