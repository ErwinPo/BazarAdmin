import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./pages/Login";

function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
          </Routes>
        </BrowserRouter>

      </div>
    );
}
 
export default App;