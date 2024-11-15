import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("")

  useEffect(() => {
    // Check if token is in localStorage on initial load
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token) {
      setIsAuthenticated(true);
    }
    if(email){
      setUser(email)
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext