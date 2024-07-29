 
import { Navigate, useLocation } from "react-router-dom"; 
import useAuth from "../hooks/useAuth";  
import useAgent from "../hooks/useAgent";

 

const AgentRoute = ({children}) => {
    const {user, loading} = useAuth();

    const [isAgent, isAgentLoading]= useAgent();

   const location = useLocation();


         
        if(loading || isAgentLoading){
            return <progress className="progress w-56"></progress>
        }
        if(user && isAgent){
            return children;
        
         }
         return <Navigate to='/' state={{from:location}} replace></Navigate>
 
};

export default AgentRoute;