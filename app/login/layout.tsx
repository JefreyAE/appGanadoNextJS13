
import React from "react";
import Login from "./components/Login";
import Title from "../layouts/titleComponent/Title";

export default function LoginLayout({children}: {children: React.ReactNode}){
    return(       
        <main className="flex min-h-screen flex-col items-center justify-between p-24 login-container">
            <Title /> 
            <Login/>
        </main> 
    )
}