import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig'
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/users");
        setUsers(response.data);
        console.log("fetched users:", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="text-blue-500 text-6xl">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
