import React from 'react';
import {AuthContext} from "@/TonalityApp.tsx";
import {useNavigate} from "react-router-dom";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = React.useState(null);

  if (window.localStorage.getItem('accessToken')) {
    setAccessToken(window.localStorage.getItem('accessToken'));
    navigate('/album')
  }

  const handleLogin = (accessToken) => {
    window.localStorage.setItem('accessToken', accessToken);
    setAccessToken(accessToken);
    navigate('/album')
  };

  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    setAccessToken(null);
    navigate('/login')
  }

  const value = {
    token: accessToken,
    onLogin: handleLogin,
    onLogout: handleLogout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;