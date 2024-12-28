import '../autofill.css';
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useContext, useEffect } from "react";
import api from '../api/axiosConfig'
import LoginContext from "../context/LoginContext";

const Register = () => {
    
    const labelStyle = "text-xl ml-1"
    const inputStyle = "text-primary-text px-3 rounded-md border-transparent outline-none mb-5 h-9 bg-primary-background-lighter caret-primary-text text-lg"

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [users, setUsers] = useState();
    const { currentUser, setCurrentUser, } = useContext(LoginContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password == password2) {
                const response = await api.post("/api/users", {username: username, password: password});
                console.log("response:", response.data);
            } else {
                alert("Passwords do not match.")
            }
            
        } catch (error) {
            console.error("Failed to register:", error);
            alert(error)
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

                <form action="" className="mt-[10%] w-[30%] h-[70%] flex flex-col justify-between rounded-lg bg-primary-background-light px-8 py-8" onSubmit={handleSubmit}>
                    <div>
                        <h1 className="text-5xl">tic tac toe.</h1>
                        <h2 className="text-3xl ">clen3t</h2>

                        <div className="flex flex-col w-[70%] my-[10%]">
                            <label htmlFor="username" className={labelStyle}>Enter Username</label>
                            <input type="text" id="username" className={inputStyle} onChange={(e) => setUsername(e.target.value)} value={username} required />

                            <label htmlFor="password" className={labelStyle}>Enter Password</label>
                            <input type="password" id="password" className={inputStyle} onChange={(e) => setPassword(e.target.value)} value={password} required />

                            <label htmlFor="password2" className={labelStyle}>Re-enter Password</label>
                            <input type="password" id="password2" className={inputStyle} onChange={(e) => setPassword2(e.target.value)} value={password2} required />
                        </div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className='flex'>
                            <p>Have an account?</p>
                            <Link to="/login" className="hover:text-primary-blue active:text-primary-blue-darker ml-2">Sign In</Link>
                        </div>
                        <button type="submit" className="text-xl py-1 px-6 rounded-lg w-[7.5rem] text-center bg-primary-blue hover:bg-primary-blue-dark active:bg-primary-blue-darker">Register</button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
     );
}
 
export default Register;