import React from "react";
//import "./App.css";
import Navbar from "./components/NavBar/Index";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Ventas from "./pages/Ventas";
import Usuarios from "./pages/Usuarios";
import Estadisticas from "./pages/Estadisticas";
import Registros from "./pages/Registros";
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/Ventas" element={<Ventas />} />
                <Route path="/Usuarios" element={<Usuarios />} />
                <Route path="/Estadisticas" element={<Estadisticas />} />
                <Route path="/Registros" element={<Registros />} />
            </Routes>
        </Router>
    );
}
 
export default App;