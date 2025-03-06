import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("$");

  // Check for token on initial load (e.g., page refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  return (
    <AuthContext.Provider 
    value={{ 
      isLoggedIn, 
      setIsLoggedIn,
      currencySymbol,
      setCurrencySymbol, 

    }}
    >
      {children}
    </AuthContext.Provider>
  );
};