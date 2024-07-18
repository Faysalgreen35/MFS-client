import { useState, useContext } from "react";
// import { AuthContext } from './context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState(null);

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signIn(emailOrPhone, pin);
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="relative">
            <section className="bg-gray-50 dark:bg-gray-900 mt-12">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-36 h-16 mr-2" src="https://rb.gy/vvpqyt" alt="logo" />
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Log in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email/Phone Number</label>
                                    <input type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIN</label>
                                    <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    New user? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create an account</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;











// import { useState } from "react";

// const Login = () => {
//     const [emailOrPhone, setEmailOrPhone] = useState("");
//     const [pin, setPin] = useState("");
//     const [error, setError] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const response = await fetch('http://localhost:5000/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ emailOrPhone, pin }), // Send email/phone and pin to backend
//             });

//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error(data.message || 'Login failed');
//             }

//             // Login successful
//             // Redirect to dashboard
//             window.location.href = 'http://localhost:5173/dashboard';

//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="relative">
//             <section className="bg-gray-50 dark:bg-gray-900 mt-12">
//                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                     <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//                         <img className="w-36 h-16 mr-2" src="https://rb.gy/vvpqyt" alt="logo" />
//                     </a>
//                     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                 Log in to your account
//                             </h1>
//                             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//                                 <div>
//                                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email/Phone Number</label>
//                                     <input type="text" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
//                                 </div>
//                                 <div>
//                                     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIN</label>
//                                     <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required />
//                                 </div>
//                                 <button type="submit" className="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
//                                 {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//                                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                     New user? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create an account</a>
//                                 </p>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Login;
