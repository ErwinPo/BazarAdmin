import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/NavBar/Index";
import Ventas from "./pages/Ventas";
import Usuarios from "./pages/Usuarios";
import Estadisticas from "./pages/Estadisticas";
import Registros from "./pages/Registros";

function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Home" element={<Navbar/>}/>
          </Routes>
        </BrowserRouter>
    );
}
 
export default App;