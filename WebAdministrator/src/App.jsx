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
        { id: '#1', date: '19/01/2024 - 01:22:33', amount: 1, quantity: 2, seller: 'John Doe' },
        { id: '#2', date: '19/02/2024 - 01:22:33', amount: 0, quantity: 3, seller: 'Jane Smith' },
        { id: '#3', date: '19/03/2024 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
        { id: '#4', date: '19/02/2024 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
        { id: '#5', date: '19/02/2024 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
        { id: '#6', date: '19/02/2024 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
        { id: '#7', date: '13/04/2024 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
        { id: '#8', date: '14/04/2024 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
        { id: '#9', date: '10/04/2024 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
        { id: '#10', date: '19/03/2024 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
        { id: '#11', date: '19/01/2024 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
        { id: '#12', date: '19/02/2024 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
        { id: '#13', date: '19/01/2023 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
        { id: '#14', date: '19/02/2023 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
        { id: '#15', date: '19/03/2023 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
        { id: '#16', date: '19/04/2023 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
        { id: '#17', date: '19/05/2023 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
        { id: '#18', date: '19/06/2023 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
        { id: '#19', date: '19/07/2023 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
        { id: '#20', date: '19/08/2023 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
        { id: '#21', date: '19/09/2023 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
        { id: '#22', date: '19/10/2023 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
        { id: '#23', date: '19/11/2023 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
        { id: '#24', date: '19/12/2023 - 01:22:33', amount: 900, quantity: 2, seller: 'Bob Brown' },
        { id: '#25', date: '19/01/2025 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
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