
import WithPrivateRoute from "../../auth/WithPrivateRoute"
import PagesContainer from '../layouts/containersComponent/PagesContainer';


export default function UsersLayout({children}: {children: React.ReactNode}){  
    
    return(       
        <WithPrivateRoute>
            <PagesContainer>
                {children}
            </PagesContainer>
        </WithPrivateRoute>    
    )
}