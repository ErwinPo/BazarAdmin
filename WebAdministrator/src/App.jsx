//import "./App.css";
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

    const sales = [
        { id: '#1', fecha: '19/01/2024', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: '#2', fecha: '19/02/2024', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: '#3', fecha: '19/03/2024', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: '#4', fecha: '19/04/2024', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: '#5', fecha: '19/05/2024', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
        { id: '#6', fecha: '19/06/2024', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: '#7', fecha: '19/07/2024', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: '#8', fecha: '19/08/2024', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: '#9', fecha: '19/09/2024', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: '#10', fecha: '19/10/2024', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
        { id: '#11', fecha: '19/11/2024', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: '#12', fecha: '19/12/2024', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: '#13', fecha: '19/01/2025', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: '#14', fecha: '19/02/2025', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: '#15', fecha: '19/03/2025', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
        { id: '#16', fecha: '19/04/2025', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: '#17', fecha: '19/05/2025', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: '#18', fecha: '19/06/2025', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: '#19', fecha: '19/07/2025', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: '#20', fecha: '19/08/2025', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
        { id: '#21', fecha: '19/09/2025', monto: 100, cantidad: 2, vendedor: 'John Doe' },
        { id: '#22', fecha: '19/10/2025', monto: 150, cantidad: 3, vendedor: 'Jane Smith' },
        { id: '#23', fecha: '19/11/2025', monto: 200, cantidad: 1, vendedor: 'Alice Johnson' },
        { id: '#24', fecha: '19/12/2025', monto: 120, cantidad: 2, vendedor: 'Bob Brown' },
        { id: '#25', fecha: '19/01/2021', monto: 180, cantidad: 4, vendedor: 'Eve Williams' },
      ];
      
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Ventas" element={<Ventas />} />
                <Route path="/Usuarios" element={<Usuarios />} />
                <Route path="/Estadisticas" element={<Estadisticas />} />
                <Route path="/Registros" element={<Registros sales={sales} />} />
            </Routes>
        </Router>
    );
}
 
export default App;