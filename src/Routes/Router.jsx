 
import {
    createBrowserRouter,
  
  } from "react-router-dom";
import Main from "../Layout/Main";
// import Home from "../components/Home/Home";
import Register from "../components/Register/Register";
import Dashboard from "../Layout/Dashboard";
import Login from "../components/Login/Login";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import SendMoney from "../Pages/SendMoney/SendMoney";
import CashOut from "../Pages/CashOut/CashOut";
import CashIn from "../Pages/CashIn/CashIn";
import Balance from "../Pages/Balance/Balance";
import Transaction from "../Pages/Transaction/Transaction"; 
import PrivateRoutes from "./../Provider/PrivateRoutes";
import CashinRequesht from "../Pages/Agent/CashinRequesht";
import AgentRoute from "./AgentRoute";
import CashOutRequest from "../Pages/Agent/CashOutRequest";
import AdminRoute from './AdminRoute';
import AllUsers from "../Pages/Admin/AllUsers";
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage />,
      children: [
        // {
        //   path: '/home',
        //   element: <Home></Home>
  
        // },
        {
          path: '/',
          element: <Login></Login>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        }, 
      //  { 
      //   path: 'dashboards',
      //   element:  <Dashboard></Dashboard>,
      // }
      ]
    },
  
    {
      path: 'dashboard',
      element:  <Dashboard></Dashboard>,
      children: [
  
        // user dashboard
        {
          path: 'send-money',
          element: <PrivateRoutes><SendMoney></SendMoney></PrivateRoutes>
        },
        {
          path: 'cash-out',
          element: <PrivateRoutes><CashOut/> </PrivateRoutes>,
        },
        {
          path: 'cash-in',
          element:  <PrivateRoutes><CashIn></CashIn></PrivateRoutes>
        },
        {
          path: 'balance-inquery',
          element:  <PrivateRoutes><Balance></Balance></PrivateRoutes>
        },
        {
          path: 'transaction-history',
          element: <PrivateRoutes> <Transaction></Transaction></PrivateRoutes>
        },

         // agent routes
         {
          path: 'cash-in-request',
          element: <AgentRoute><CashinRequesht></CashinRequesht></AgentRoute>
         },
         {
          path: 'cash-out-request',
          element: <AgentRoute><CashOutRequest></CashOutRequest></AgentRoute>
         },
         {
          path: 'balance-inquery',
          element: <AgentRoute><Balance></Balance></AgentRoute>
         },
         {
          path: 'transaction-history',
          element: <AgentRoute> <Transaction></Transaction></AgentRoute>
        },
      
        // admin routes
        {
          path: 'all-users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
         },
         {
          path: 'transaction-history',
          element: <AdminRoute> <Transaction></Transaction></AdminRoute>
        },
        
       
  
  
  
  
  
      ]
    },
  ]);