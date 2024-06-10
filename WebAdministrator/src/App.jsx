import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ventas from './pages/Ventas';
import UsersView from './components/Users/UsersView';
import Estadisticas from './pages/Estadisticas';
import RecordsView from "./components/Records/RecordsView";
import Login from './components/Login/Login';
import Download from './pages/Download';
import ResetPassword from './pages/ResetPassword';

export const AuthContext = createContext();

function App() {
    const [authLoading, setAuthLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [expirationMessage, setExpirationMessage] = useState("");

    useEffect(() => {
        const checkAuth = async () => {
            const access_token = localStorage.getItem('access_token');
            const login_time = localStorage.getItem('login_time');
            if (access_token && login_time) {
                const now = new Date().getTime();
                const timeElapsed = now - parseInt(login_time);
                const time_ms = 4 * 60 * 60 * 1000;
                if (timeElapsed > time_ms) {
                    handleLogout("Su sesión ha expirado");
                } else {
                    setIsLoggedIn(true);
                    setTimeout(() => handleLogout("Su sesión ha expirado"), time_ms - timeElapsed);
                }
            }
            setAuthLoading(false);
        };

        checkAuth();
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = (message) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('login_time');
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
        setExpirationMessage(message);
    };

    useEffect(() => {
        if (expirationMessage) {
            toast.error(expirationMessage);
            setExpirationMessage("");
        }
    }, [expirationMessage]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            <ToastContainer position="top-center" autoClose={3000} />
            {!authLoading && (
                <Router>
                    <Routes>
                        <Route path="/" element={isLoggedIn ? <Navigate to="/Ventas" /> : <Login />} />
                        <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
                        <Route path="/Descarga" element={<Download />} />
                        <Route path="/Ventas" element={<Ventas />} />
                        <Route path="/Registros" element={<RecordsView />} />
                        {isLoggedIn && (
                            <>
                                
                                <Route path="/Usuarios" element={<UsersView />} />
                                <Route path="/Estadisticas" element={<Estadisticas />} />
                                
                                <Route path="/*" element={<Navigate to="/Ventas" replace />} />
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