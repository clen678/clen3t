import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import StdButton from "../components/StdButton";
import { useState, useContext, useEffect } from "react";
import api from '../api/axiosConfig'
import LoginContext from "../context/LoginContext";

const Login = () => {
    
    const labelStyle = "text-lg"
    const inputStyle = "text-primary-background px-2 rounded-md border-transparent outline-none mb-5 h-8"

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState();
    const { currentUser, setCurrentUser, } = useContext(LoginContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log("pressed login")
        e.preventDefault();
        try {
            const response = await api.get("/api/users");
            setUsers(response.data);

            console.log("fetched users:", response.data);

            const user = response.data.find((u) => u.username === username && u.password === password);

            if(user){
                console.log("found user:", user);
                setCurrentUser(user);
            } else {
                console.log("no users found for login details:", username, password)
            }
            
        } catch (error) {
            console.error("Error fetching users/login:", error);
        }
    };

    // navigate when currentUser is updated
    useEffect(() => {
        if (currentUser) {
            console.log("currentUser set:", currentUser.username);
            navigate("/game");
        }
    }, [currentUser]);
    
    return ( 
        <div className="bg-primary-background w-full h-screen text-primary-text font-serif font-semibold">
            <div className="flex justify-center h-[96%]">

                <form action="" className="mt-[10%] w-[30%] h-[70%] flex flex-col justify-between bg-primary-background-light px-8 py-8" onSubmit={handleSubmit}>
                    <div>
                        <h1 className="text-5xl">tic tac toe.</h1>
                        <h2 className="text-3xl ">clen3t</h2>

                        <div className="flex flex-col w-[70%] my-[10%]">
                            <label htmlFor="username" className={labelStyle}>Username</label>
                            <input type="text" id="username" className={inputStyle} onChange={(e) => setUsername(e.target.value)} value={username} required />

                            <label htmlFor="password" className={labelStyle}>Password</label>
                            <input type="text" id="password" className={inputStyle} onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </div>
                    </div>

                    <div className="flex justify-between items-end">
                        <Link to="/register" className="hover:text-primary-blue active:text-primary-blue-darker">Register</Link>
                        <button type="submit" className="text-xl py-1 px-6 rounded-lg w-[7.5rem] text-center bg-primary-blue hover:bg-primary-blue-dark active:bg-primary-blue-darker">Sign In</button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
     );
}
 
export default Login;