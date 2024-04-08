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
    const sales = [
        { id: 1, fecha: '2024-04-01', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: 2, fecha: '2024-04-02', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: 3, fecha: '2024-04-03', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: 4, fecha: '2024-04-04', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: 5, fecha: '2024-04-05', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
        { id: 6, fecha: '2024-04-01', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: 7, fecha: '2024-04-02', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: 8, fecha: '2024-04-03', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: 9, fecha: '2024-04-04', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: 10, fecha: '2024-04-05', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
        { id: 11, fecha: '2024-04-01', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: 12, fecha: '2024-04-02', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: 13, fecha: '2024-04-03', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: 14, fecha: '2024-04-04', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: 15, fecha: '2024-04-05', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
        { id: 16, fecha: '2024-04-01', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: 17, fecha: '2024-04-02', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: 18, fecha: '2024-04-03', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: 19, fecha: '2024-04-04', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: 20, fecha: '2024-04-05', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
        { id: 21, fecha: '2024-04-01', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: 22, fecha: '2024-04-02', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: 23, fecha: '2024-04-03', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: 24, fecha: '2024-04-04', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: 25, fecha: '2024-04-05', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
      ];
      
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/Ventas" element={<Ventas />} />
                <Route path="/Usuarios" element={<Usuarios />} />
                <Route path="/Estadisticas" element={<Estadisticas />} />
                <Route path="/Registros" element={<Registros sales={sales} />} />
            </Routes>
        </Router>
    );
}
 
export default App;