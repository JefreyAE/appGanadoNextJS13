'use client'
import Link from "next/link";
import UserDropDown from '../userDropDownComponent/UserDropDown';
import React from 'react';
import DropDownElement from "./DropDownElement";
import { herdListOptions, animalListOptions, purchaseListOptions, salesListOptions, incidentListOptions, injectablesListOptions, notificationsListOptions, statisticsListOptions } from '../navigationsOptions'
import { usePathname } from "next/navigation";


interface NavbarProps {
    isVisibleProp?: boolean
}
export default function Navbar({ isVisibleProp = true }: NavbarProps) {

    const pathname = usePathname()
   
    const hideNav = {
        "display": "none"
    }
    const showNav = {
        "display": "block"
    }

    return (
        <>
            {pathname !== '/' && <header id="header" className="col-md-12" style={isVisibleProp ? showNav : hideNav}>
                <nav id="nav-1" className="navbar navbar-expand-xl navbar-dark bg-dark">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto nav-home-icon">
                                <li className="nav-item active">
                                    <Link className="nav-link " href="/main" aria-current="page"><span className="fa-solid fa-house"></span></Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav nav-align-center ml-auto">
                                <DropDownElement listElments={herdListOptions} title="Módulo de Hatos" />
                                <DropDownElement listElments={animalListOptions} title="Módulo de Animales" />
                                <DropDownElement listElments={purchaseListOptions} title="Módulo de Compras" />
                                <DropDownElement listElments={salesListOptions} title="Módulo de Ventas" />
                                <DropDownElement listElments={incidentListOptions} title="Módulo de incidentes" />
                                <DropDownElement listElments={injectablesListOptions} title="Módulo de Inyectables" />
                                <DropDownElement listElments={notificationsListOptions} title="Módulo de Notificaciones" />
                                <DropDownElement listElments={statisticsListOptions} title="Módulo de Estadísticas" />
                                <DropDownElement listElments={herdListOptions} title="Módulo de Hatos" />
                                <UserDropDown />
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            }
        </>
    );
}
