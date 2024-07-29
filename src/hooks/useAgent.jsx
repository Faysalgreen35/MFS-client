import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAgent = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAgent, setIsAgent] = useState(null);
  const [isAgentLoading, setIsAgentLoading] = useState(true);

  useEffect(() => {
    const checkAgent = async () => {
      if (!loading && user?.email) {
        try {
          const res = await axiosSecure.get(`/users/role/${user?.email}`);
          setIsAgent(res.data?.role === 'agent');
        } catch (error) {
          console.error('Failed to check agent status', error);
          setIsAgent(null);
        } finally {
          setIsAgentLoading(false);
        }
      }
    };
    
    checkAgent();
  }, [user, loading, axiosSecure]);

  return [isAgent, isAgentLoading];
};

export default useAgent;
 
// import { useState, useEffect } from 'react';
// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';

// const useAgent = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [isAgent, setIsAgent] = useState(null);
//   const [isAgentLoading, setIsAgentLoading] = useState(true);

//   useEffect(() => {
//     const checkAgent = async () => {
//       if (!loading && user?.email) {
//         try {
//           const res = await axiosSecure.get(`/users/agent/${user?.email}`);
//           setIsAgent(res.data?.agent);
//         } catch (error) {
//           console.error('Failed to check agent status', error);
//           setIsAgent(null);
//         } finally {
//           setIsAgentLoading(false);
//         }
//       }
//     };
    
//     checkAgent();
//   }, [user, loading, axiosSecure]);

//   return [isAgent, isAgentLoading];
// };

// export default useAgent;
