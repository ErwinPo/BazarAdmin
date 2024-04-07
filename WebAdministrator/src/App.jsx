//import "./App.css";
import "./components/NavBar/NavbarStyles.css";
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
    const ventas = [
        { id: 1, fecha: '2024-04-01', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: 2, fecha: '2024-04-02', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: 3, fecha: '2024-04-03', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: 4, fecha: '2024-04-04', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: 5, fecha: '2024-04-05', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
      ];
      
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/Ventas" element={<Ventas />} />
                <Route path="/Usuarios" element={<Usuarios />} />
                <Route path="/Estadisticas" element={<Estadisticas />} />
                <Route path="/Registros" element={<Registros ventas={ventas} />} />
            </Routes>
        </Router>
    );
}
 
export default App;