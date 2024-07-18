import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/register', { email, password });
      setUser(response.data.user);
      localStorage.setItem('access-token', response.data.token);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signIn = async (emailOrPhone, pin) => {
    setLoading(true);
    try {
        const response = await axios.post('http://localhost:5000/login', { emailOrPhone, pin });
        setUser(response.data.user);
        localStorage.setItem('access-token', response.data.token);
        setLoading(false);
        
        return response.data;
    } catch (error) {
        setLoading(false);
        throw error;
    }
};
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('access-token');
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('access-token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data.user);
        } catch (error) {
          console.log(error);
          localStorage.removeItem('access-token');
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



// // src/context/AuthContext.js
// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Load the token from local storage and decode the user info
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       const decodedUser = jwtDecode(token);
//       setUser(decodedUser);
//     }
//     setLoading(false);
//   }, []);

//   const register = async (name, email, mobileNumber, pin) => {
//     const response = await axios.post('http://localhost:5000/register', {
//       name,
//       email,
//       pin,
//       mobileNumber,
//     });
//     return response.data;
//   };

//   const login = async (identifier, pin) => {
//     const response = await axios.post('http://localhost:5000/login', {
//       identifier,
//       pin,
//     });
//     const { token } = response.data;
//     localStorage.setItem('authToken', token);
//     const decodedUser = jwtDecode(token);
//     setUser(decodedUser);
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     setUser(null);
//   };

//   const authInfo = {
//     user,
//     loading,
//     register,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
