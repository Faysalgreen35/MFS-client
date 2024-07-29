import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useAgent from '../hooks/useAgent';
import { HiArrowRightOnRectangle } from "react-icons/hi2";
const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState('light');
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();


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
    const handleLogout = async () => {
        try {
            await logOut();
            // Handle successful logout if needed
            navigate('/login'); // Redirect to dashboard
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <div className='flex relative '>
            <div className="flex  ">
                {/* Menu Icon for Small Devices */}
                <button
                    className="block absolute top-0 left-0 mt-12  lg:hidden p-2 focus:outline-none"
                    onClick={handleSidebarToggle}
                >
                    <svg
                        className="w-8 h-8 text-gray-600 dark:text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>

                {/* Overlay for Small Devices */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
                )}

                <aside
                    ref={sidebarRef}
                    className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } fixed inset-y-0 left-0 md:w-64 h-screen px-5 py-8 overflow-y-auto bg-yellow-100 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 transform lg:translate-x-0 transition-transform duration-200 ease-in-out z-30`}
                >
                    <Link to="/">
                        <img className="w-auto h-12 lg:w-36 lg:h-16 lg:ml-4" src="https://rb.gy/vvpqyt" alt="" />
                    </Link>

                    <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav className="-mx-3 space-y-6">
                            <ul className="space-y-3">
                                {

                                    isAdmin ?
                                    <>
                                     <>
                                             
                                            <li>
                                                <NavLink
                                                    to="/dashboard/all-users"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Users</span>
                                                </NavLink>
                                            </li>
                                            

                                            <li>
                                                <NavLink
                                                    to="/dashboard/transaction-history"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Transactions History</span>
                                                </NavLink>
                                            </li>
                                        </>
                                    </>
                                    :
                                    isAgent ?
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/dashboard/cash-in-request"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Cash In Requests</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/dashboard/cash-out-request"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Cash Out Requests</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/dashboard/balance-inquery"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Balance Inquiry</span>
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink
                                                    to="/dashboard/transaction-history"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Transactions History</span>
                                                </NavLink>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li>
                                                <NavLink
                                                    to="/dashboard/send-money"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Send Money</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/dashboard/cash-out"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Cash-Out</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/dashboard/cash-in"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Cash-in</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/dashboard/balance-inquery"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Balance Inquiry</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/dashboard/transaction-history"
                                                    className={({ isActive }) =>
                                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                            ? 'text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200'
                                                            : 'text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200'
                                                        }`
                                                    }
                                                >
                                                    <span className="mx-2 text-sm font-medium">Transactions History</span>
                                                </NavLink>
                                            </li>
                                        </>
                                }

                            </ul>

                            {/* ------------- */}

                            <ul className="space-y-3  border-t-2 border-dotted border-black pt-6">

                                <li>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${isActive
                                                ? "text-gray-700 bg-gray-300 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                            }`
                                        }
                                    >
                                        <button onClick={handleLogout} className="
                                      mx-2 text-sm font-medium">
                                           <HiArrowRightOnRectangle className='text-4xl text-center mx-12' />
                                        </button>
                                    </NavLink>
                                </li>

                            </ul>

                        </nav>
                    </div>
                </aside>
            </div>
            <div className="md:flex-1 p-8">
                {/* dark and light mode  */}
                <div className='absolute top-0 right-0 mr-0 md:mr-4 mt-12 md:mt-12  '>
                    <span className='mx-2 text-sm font-medium  '>  </span>
                    <button
                        id="theme-toggle"
                        type="button"
                        className="text-green-500 text-3xl ml-12 border rounded-full border-yellow-500 p-3     dark:text-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700  p-5.5"
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? (
                            <svg
                                id="theme-toggle-dark-icon"
                                className="w-7 h-7"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                        ) : (
                            <svg
                                id="theme-toggle-light-icon"
                                className=" w-7 h-7 bg-white text-green-500 rounded-full p-1  "
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

                </div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;





// import  { useState } from 'react';

// const Dashboard = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <div className="text-center">
//         <button
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//           type="button"
//           onClick={toggleDrawer}
//         >
//           Show navigation
//         </button>
//       </div>
//       <div
//         className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } bg-white dark:bg-gray-800`}
//         tabIndex="-1"
//         aria-labelledby="drawer-navigation-label"
//       >
//         <h5
//           id="drawer-navigation-label"
//           className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
//         >
//           Menu
//         </h5>
//         <button
//           type="button"
//           className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//           onClick={toggleDrawer}
//         >
//           <svg
//             aria-hidden="true"
//             className="w-5 h-5"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//           <span className="sr-only">Close menu</span>
//         </button>
//         <div className="py-4 bg-blue-300 overflow-y-auto">
//           <ul className="space-y-2 font-medium">
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span className="ml-3  text-white">Send Money</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span className="ml-3  text-white">Cash-Out</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span className="ml-3  text-white">Cash-in</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span className="ml-3  text-white">Balance Inquiry</span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
//               >
//                 <svg
//                   className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 22 21"
//                 >
//                   <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                   <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                 </svg>
//                 <span className="ml-3  text-white">Transactions History</span>
//               </a>
//             </li>
//             {/* Add more items here */}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
