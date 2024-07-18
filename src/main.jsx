import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Router'; 
import AuthProvider from './Provider/AuthProvider';
// import { AuthProvider } from './Provider/AuthProvider';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HelmetProvider>
      <AuthProvider>
      <div className='max-w-screen-xl mx-auto  dark:bg-gray-800  dark:text-white '>
    <RouterProvider router={router} />
    </div>
    </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
