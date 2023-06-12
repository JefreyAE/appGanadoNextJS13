
import React from "react";
import Container from'../layouts/containerComponent/containerComponent'
import Navbar from "../layouts/navbarComponent/Navbar";
import WithPrivateRoute from "../auth/WithPrivateRoute"
import { ToastContainer } from "react-toastify";

export default function AnimalsLayout({children}: {children: React.ReactNode}){  
    return(       
        <WithPrivateRoute>
            <Navbar />
            <Container>
                {children}
            </Container>
        </WithPrivateRoute>    
    )
}