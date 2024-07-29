import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import LoadingSpinner from './../Layout/LoadingSpinner';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const createUser = async (name, pin, mobileNumber, email) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post('http://localhost:5000/register', { name, pin, mobileNumber, email });
  //     setUser(response.data.user);
  //     localStorage.setItem('access-token', response.data.token);
  //     setLoading(false);
  //     return response.data;
  //   } catch (error) {
  //     setLoading(false);
  //     throw error;
  //   }
  // };

  // const signIn = async (emailOrPhone, pin) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post('http://localhost:5000/login', { emailOrPhone, pin });
  //     setUser(response.data.user);
  //     localStorage.setItem('access-token', response.data.token);
  //     setLoading(false);
  //     return response.data;
  //   } catch (error) {
  //     setLoading(false);
  //     throw error;
  //   }
  // };
  const createUser = async (name, pin, mobileNumber, email) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/register', { name, pin, mobileNumber, email });
      setUser(response.data.user);
      localStorage.setItem('access-token', response.data.token);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error('Registration error:', error);
      throw error; // Rethrow the error to handle it further up the call stack
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
      console.error('Login error:', error);
      throw error; // Rethrow the error to handle it further up the call stack
    }
  };
  

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('access-token');
    setUser(null);
    setLoading(false);
  };

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const token = localStorage.getItem('access-token');
  //     if (token) {
  //       try {
  //         const response = await axios.get('http://localhost:5000/user', {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         });
  //         setUser(response.data.user);
  //       } catch (error) {
  //         console.error('Token validation error:', error);
  //         localStorage.removeItem('access-token');
  //       }
  //     }
  //     setLoading(false);
  //   };
  //   checkUser();
  // }, []);
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
          console.error('Token validation error:', error);
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('access-token');
            setUser(null);
          }
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
       {loading ? <LoadingSpinner/>: children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

 
// import { createContext, useEffect, useState } from "react";
// import axios from 'axios';

// export const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // const createUser = async (email, password) => {
//   //   setLoading(true);
//   //   try {
//   //     const response = await axios.post('http://localhost:5000/register', { email, password });
//   //     setUser(response.data.user);
//   //     localStorage.setItem('access-token', response.data.token);
//   //     setLoading(false);
//   //     return response.data;
//   //   } catch (error) {
//   //     setLoading(false);
//   //     throw error;
//   //   }
//   // };
//   const createUser = async (name, pin, mobileNumber, email) => {
//     setLoading(true);
//     try {
//         const response = await axios.post('http://localhost:5000/register', { name, pin, mobileNumber, email });
//         setUser(response.data.user);
//         localStorage.setItem('access-token', response.data.token);
//         setLoading(false);
//         return response.data;
//     } catch (error) {
//         setLoading(false);
//         throw error;
//     }
// };

//   const signIn = async (emailOrPhone, pin) => {
//     setLoading(true);
//     try {
//         const response = await axios.post('http://localhost:5000/login', { emailOrPhone, pin });
//         setUser(response.data.user);
//         localStorage.setItem('access-token', response.data.token);
//         setLoading(false);
        
//         return response.data;
//     } catch (error) {
//         setLoading(false);
//         throw error;
//     }
// };
//   const logOut = () => {
//     setLoading(true);
//     localStorage.removeItem('access-token');
//     setUser(null);
//     setLoading(false);
//   };

//   useEffect(() => {
//     const checkUser = async () => {
//       const token = localStorage.getItem('access-token');
//       if (token) {
//         try {
//           const response = await axios.get('http://localhost:5000/user', {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//           setUser(response.data.user);
//         } catch (error) {
//           console.log(error);
//           localStorage.removeItem('access-token');
//         }
//       }
//       setLoading(false);
//     };
//     checkUser();
//   }, []);

//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     signIn,
//     logOut,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
 