import { useState, useEffect } from 'react';
import useAuth from './useAuth'; 
import useAxiosSecure from './useAxiosSecure';
const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!loading && user?.email) {
        try {
          const res = await axiosSecure.get(`/users/admin/${user?.email}`);
          setIsAdmin(res.data?.admin);
        } catch (error) {
          console.error('Failed to check admin status', error);
          setIsAdmin(null);
        } finally {
          setIsAdminLoading(false);
        }
      }
    };
    
    checkAdmin();
  }, [user, loading, axiosSecure]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;








// import { useQuery } from "@tanstack/react-query";
// // import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";
// // import useAuth from "./useAuth";
// // import useAxiosSecure from "./useAxiosSecure";

 

// const useAdmin = () => {
// const {user, loading} = useAuth();
// const axiosSecure= useAxiosSecure();
// const {data: isAdmin, isPending:isAdminLoading}= useQuery({
//     queryKey: [user?.email, 'isAdmin'],
//     enabled:!loading,
//     queryFn: async () =>{
//         // console.log('asking or checking is admin', user);
//         const res = await axiosSecure.get(`/users/admin/${user?.email}`);
//         console.log(res.data);
//         return res.data?.admin;

//     }

// })

// return [isAdmin, isAdminLoading]
    

// };

// export default useAdmin;