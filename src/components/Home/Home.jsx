import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();



    const handleLogout = async () => {
        try {
          await logOut();
          // Handle successful logout if needed
          navigate('/login'); // Redirect to dashboard
        } catch (error) {
          console.error("Logout error:", error);
        }
      };
    

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Check the initial theme
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    };
    return (
        <div>
            <button
                id="theme-toggle"
                type="button"
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                onClick={toggleTheme}
            >
                {theme === 'light' ? (
                    <svg
                        id="theme-toggle-dark-icon"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                ) : (
                    <svg
                        id="theme-toggle-light-icon"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                )}
            </button>

            <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-green-300">
                        Logout
                      </button>
            <h1>Hello Bkash</h1>
        </div>
    );
};

export default Home;

// // src/pages/HomePage.js
// import   { useContext } from 'react';
// import { AuthContext } from '../../Provider/AuthProvider';
// import { AuthContext } from '../context/AuthContext';

// const Home = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <div>
//       <h1>Welcome, {user?.name}</h1>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// };

// export default Home;
