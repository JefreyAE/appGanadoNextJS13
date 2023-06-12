import React from "react";
import LoginComponent from "./LoginComponent";
import Title from "../layouts/titleComponent/Title";

export default function LoginLayout({children}: {children: React.ReactNode}){
    return(       
        <React.Fragment>
            <Title/>
            <LoginComponent/>
        </React.Fragment>    
    )
}