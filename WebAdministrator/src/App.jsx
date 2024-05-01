import React, { useState, useEffect, createContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Ventas from './pages/Ventas';
import Usuarios from './pages/Usuarios';
import Estadisticas from './pages/Estadisticas';
import Registros from './pages/Registros';
import Login from './pages/Login';

export const AuthContext = createContext();

function App() {
    const [authLoading, setAuthLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const access_token = localStorage.getItem('access_token');
            if (access_token) {
                setIsLoggedIn(true);
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
                        {!isLoggedIn && <Route path="/" element={<Login />} />}
                        {isLoggedIn && (
                            <>
                                <Route path="/Ventas" element={<Ventas />} />
                                <Route path="/Usuarios" element={<Usuarios />} />
                                <Route path="/Estadisticas" element={<Estadisticas />} />
                                <Route path="/Registros" element={<Registros />} />
                                <Route path="/*" element={<Navigate to="/" replace />} />
                            </>
                        )}
                    </Routes>
                </Router>
            )}
        </AuthContext.Provider>
    );
}

export default App;
