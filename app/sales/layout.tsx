
import React from "react";
import WithPrivateRoute from "../../auth/WithPrivateRoute"
import PagesContainer from "../layouts/containersComponent/PagesContainer";

export default function SalesLayout({children}: {children: React.ReactNode}){  
    return(       
        <WithPrivateRoute>
            <PagesContainer>
                {children}
            </PagesContainer>
        </WithPrivateRoute>    
    )
}