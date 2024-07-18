 
import {
    createBrowserRouter,
  
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../components/Home/Home";
import Register from "../components/Register/Register";
import Dashboard from "../Layout/Dashboard";
import Login from "../components/Login/Login";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import SendMoney from "../Pages/SendMoney/SendMoney";
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home></Home>
  
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
          element: <SendMoney></SendMoney>
        },
        // {
        //   path: 'my-added-pets',
        //   element: <PrivateRoutes><MyAddedPets></MyAddedPets></PrivateRoutes>,
        // },
        // {
        //   path: 'updatePetList/:id',
        //   element: <PrivateRoutes><UpdatePetAddedPage /></PrivateRoutes>,
        //   // loader: ({ params }) => fetch(`http://localhost:5000/petList/${params.id}`)
        //   loader: ({ params }) => fetch(`https://pet-adoption-server-delta.vercel.app/${params.id}`)
        // },
        // {
        //   path: 'create-donation',
        //   element: <PrivateRoutes><CreateDonation></CreateDonation></PrivateRoutes>,
        // },
        // {
        //   path: 'my-donate-campaign',
        //   element: <PrivateRoutes><MyDonationCampaigns /></PrivateRoutes>,
        // },
        // {
        //   path: 'updateDonate/:id',
        //   element: <PrivateRoutes><UpdateDonate /></PrivateRoutes>,
        //   // loader: ({ params }) => fetch(`http://localhost:5000/donate/${params.id}`)
        //   loader: ({ params }) => fetch(`https://pet-adoption-server-delta.vercel.app/donate/${params.id}`)
        // },
        // {
        //   path: 'adopt-request',
        //   element: <PrivateRoutes><AdoptRequest /></PrivateRoutes>,
        // },
        // {
        //   path: 'my-donations',
        //   element: <PrivateRoutes><MyDonations></MyDonations></PrivateRoutes>
        // },
  
        // admin routes
  
        // {
        //   path: 'users',
        //   element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        // },
        // {
        //   path: 'all-pets',
        //   element: <AdminRoute><AllPets></AllPets></AdminRoute>
        // },
        // {
        //   path: 'all-donations',
        //   element: <AdminRoute><AllDonations></AllDonations></AdminRoute>
        // },
       
  
  
  
  
  
      ]
    },
  ]);