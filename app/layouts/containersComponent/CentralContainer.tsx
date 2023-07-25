'use client'
import { usePathname } from "next/navigation";
import Navbar from "../navbarComponent/Navbar";
import SideBarNavigation from "../sidebarComponent/Sidebar";

export default function CentralContainer({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    return (<>
        {
            pathname !== '/' ?
            <>
                <Navbar />
                <div id="container-all" className="wrap col-md-12">
                    <SideBarNavigation />
                    {children}
                </div> 
            </> :
            <>{ children }</>
        }
    </>
    )
}