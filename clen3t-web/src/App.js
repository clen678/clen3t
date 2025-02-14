// import api from './api/axiosConfig'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Game from './pages/Game';
import Login from './pages/Login';
import Register from './pages/Register';
import { LoginContextProvider } from './context/LoginContextProvider';
import { GameContextProvider } from './context/GameContextProvider';


function App() {

  // const [users, setUsers] = useState();

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await api.get("/api/users");
  //       setUsers(response.data);
  //       console.log("fetched users:", response.data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <BrowserRouter>
      <LoginContextProvider>
        <GameContextProvider>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="game" element={<Game />} />
          </Routes>
        </GameContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
