import './App.css';
import api from './api/axiosConfig'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/Start';


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
      <Routes>
        <Route path="/" element={<Start />} />
        {/* <Route path="login" element={<Login />} />
        <Route path="game" element={<Game />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
