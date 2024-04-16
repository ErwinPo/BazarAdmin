//import "./App.css";
import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Ventas from "./pages/Ventas";
import Usuarios from "./pages/Usuarios";
import Estadisticas from "./pages/Estadisticas";
import Registros from "./pages/Registros";
import Login from "./pages/Login/Login";

function App() {
    const [sales, setSales] = useState([{ sales_id: 1, date: '05/07/2024', amount: 100, quantity: 2, user_id: 'John Doe' }]);
    useEffect(() => {
        fetch("http://localhost:8000/BAZARAPI/ventas", {
          method: "GET"
        })
          .then((response) => response.json())
          .then(data => {console.log(data.registros); setSales(data.registros);})
          .catch((error) => console.log(error));
      }, []);

    const users = [
        { id: 1, username: "Lety", password: "*********", usertype: "Admin"},
        { id: 2, username: "Daniel", password: "******", usertype: "Vendedor"},
        { id: 3, username: "David", password: "********", usertype: "Vendedor"},
        { id: 4, username: "Diego", password: "********", usertype: "Vendedor"},
        { id: 5, username: "Erwin", password: "*******", usertype: "Vendedor"},
        { id: 6, username: "Josafat", password: "********", usertype: "Vendedor"},
        { id: 7, username: "Raúl", password: "**********", usertype: "Vendedor"},
    ]

    console.log(sales)
    console.log(users)
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Ventas" element={<Ventas />} />
                <Route path="/Usuarios" element={<Usuarios users={users}/>} />
                <Route path="/Estadisticas" element={<Estadisticas />} />
                <Route path="/Registros" element={<Registros sales={sales} />} />
            </Routes>
        </Router>
    );
}
 
export default App;