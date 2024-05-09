import React, { useState, useEffect, createContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Ventas from './pages/Ventas';
import Usuarios from './components/Users/UsersView';
import Estadisticas from './pages/Estadisticas';
import RecordsView from "./components/Records/RecordsView";
import Login from './components/Login/Login';

export const AuthContext = createContext();

function App() {
    const [authLoading, setAuthLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const access_token = localStorage.getItem('access_token');
            if (access_token) {
                setIsLoggedIn(true);
                console.log("hola")
            }
            setAuthLoading(false);
        };
        
        checkAuth();
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            {!authLoading && (
                <Router>
                    <Routes>
                        <Route path="/" element={isLoggedIn ? <Navigate to="/Ventas" /> : <Login />} />
                        {isLoggedIn && (
                            <>
                                <Route path="/Ventas" element={<Ventas />} />
                                <Route path="/Usuarios" element={<Usuarios />} />
                                <Route path="/Estadisticas" element={<Estadisticas />} />
                                <Route path="/Registros" element={<RecordsView />} />
                                <Route path="/*" element={<Navigate to="/Ventas" />} />
                            </>
                        )}
                        {!isLoggedIn && (
                            <Route path="/*" element={<Navigate to="/" />} />
                        )}
                    </Routes>
                </Router>
            )}
        </AuthContext.Provider>
    );
    
}

export default App;
