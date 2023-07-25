import React from "react";
import Login from "./components/Login";
import Title from "../layouts/titleComponent/Title";
import WithPrivateRoute from "../../auth/WithPrivateRoute";

export default function LoginLayout({children}: {children: React.ReactNode}){
    return(       
        <>
            <Title/>
            <Login/>
        </>    
    )
}