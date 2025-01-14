import '../autofill.css';
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useContext, useEffect } from "react";
import api from '../api/axiosConfig'
import LoginContext from "../context/LoginContext";

const Login = () => {
    
    const labelStyle = "text-xl ml-1 max-[730px]:text-lg"
    const inputStyle = "text-primary-text px-3 rounded-md border-transparent outline-none mb-5 h-9 bg-primary-background-lighter caret-primary-text text-lg max-[730px]:text-base"

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
                alert("Username or password incorrect")
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
        <div className="w-full h-screen text-primary-text font-serif font-semibold flex flex-col">
            <div className="flex flex-col items-center h-full">

                <form action="" className="mt-[8%] w-[30%] h-[70%] flex flex-col justify-between rounded-lg bg-primary-background-light px-8 py-8 max-[1600px]:w-[40%] max-[1170px]:w-[50%] max-[730px]:w-[70%]" onSubmit={handleSubmit}>
                    <div>
                        <h1 className="text-5xl max-[730px]:text-4xl">tic tac toe.</h1>
                        <h2 className="text-3xl max-[730px]:text-2xl">clen3t</h2>

                        <div className="flex flex-col w-[70%] my-[10%] max-[730px]:w-[85%]">
                            <label htmlFor="username" className={labelStyle}>Username</label>
                            <input type="text" id="username" className={inputStyle} onChange={(e) => setUsername(e.target.value)} value={username} required />

                            <label htmlFor="password" className={labelStyle}>Password</label>
                            <input type="password" id="password" className={inputStyle} onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className='flex max-[1170px]:flex-col max-[1170px]:justify-start'>
                            <p className='max-[400px]:text-sm'>Don't have an account?</p>
                            <Link to="/register" className="hover:text-primary-blue active:text-primary-blue-darker ml-2 max-[1170px]:ml-0 max-[1170px]:text-sm">Register</Link>
                        </div>
                        <button type="submit" className="text-xl py-1 px-6 rounded-lg w-[7.5rem] text-center bg-primary-blue hover:bg-primary-blue-dark active:bg-primary-blue-darker max-[730px]:text-lg max-[400px]:text-base max-[400px]:px-3">Sign In</button>
                    </div>
                </form>
            <Footer />
            </div>
        </div>
     );
}
 
export default Login;