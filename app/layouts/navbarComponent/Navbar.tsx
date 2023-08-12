'use client'
import Link from "next/link";
import UserDropDown from '../userDropDownComponent/UserDropDown';
import React, { useState } from 'react';
import DropDownElement from "./DropDownElement";
import { herdListOptions, animalListOptions, purchaseListOptions, salesListOptions, incidentListOptions, injectablesListOptions, notificationsListOptions, statisticsListOptions } from '../navigationsOptions'
import { usePathname } from "next/navigation";

interface NavbarProps {
    isVisibleProp?: boolean
}

export default function Navbar({ isVisibleProp = true }: NavbarProps) {

    const pathname = usePathname()
    const [navbarCollapseStyle, setNavbarCollapseStyle] = useState("collapse navbar-collapse")
   
    const showNavbarCollapsed = "collapse navbar-collapse show";
    const hideNavbarCollapsed = "collapse navbar-collapse";

    const collapseMenu = ()=>{
        setNavbarCollapseStyle(navbarCollapseStyle === hideNavbarCollapsed ?  showNavbarCollapsed : hideNavbarCollapsed)
    }

    const closeMenu = ()=>{
        //setNavbarCollapseStyle( hideNavbarCollapsed)
    }

    return (
        <>
            {pathname !== '/' && isVisibleProp && <header id="header" className="col-md-12">
                <nav id="nav-1" className="navbar navbar-expand-xl navbar-dark bg-dark" onMouseLeave={closeMenu}>
                    <div className="container-fluid">
                        <button className="navbar-toggler" onClick={collapseMenu} type="button" data-toggle="collapse" 
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={navbarCollapseStyle} id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto nav-home-icon">
                                <li className="nav-item nav-item-home nav-item-custom active">
                                    <Link className="nav-link " href="/main" aria-current="page"><span className="fa-solid fa-house"></span></Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav nav-align-center ml-auto">
                                <DropDownElement collapseNavbar={collapseMenu} listElments={herdListOptions} title="Módulo de Hatos" />
                                <DropDownElement collapseNavbar={collapseMenu} listElments={animalListOptions} title="Módulo de Animales" />
                                <DropDownElement collapseNavbar={collapseMenu} listElments={purchaseListOptions} title="Módulo de Compras" />
                                <DropDownElement collapseNavbar={collapseMenu} listElments={salesListOptions} title="Módulo de Ventas" />
                                <DropDownElement collapseNavbar={collapseMenu} listElments={incidentListOptions} title="Módulo de incidentes" />
                                <DropDownElement collapseNavbar={collapseMenu} listElments={injectablesListOptions} title="Módulo de Inyectables" />
                                <DropDownElement collapseNavbar={collapseMenu} listElments={notificationsListOptions} title="Módulo de Notificaciones" />
                                <DropDownElement collapseNavbar={collapseMenu} listElments={statisticsListOptions} title="Módulo de Estadísticas" />
                                <DropDownElement collapseNavbar={collapseMenu} listElments={herdListOptions} title="Módulo de Hatos" />
                                <UserDropDown collapseNavbar={collapseMenu} />
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            }
        </>
    );
}
