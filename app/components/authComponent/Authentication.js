import react from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Authentication = () =>{

    let token = sessionStorage.getItem("token");
    let location = useLocation();

    if(token){
        return <Outlet />;
    }

    return(
        <Navigate to="/"/>
    );

   
}

export default Authentication;

