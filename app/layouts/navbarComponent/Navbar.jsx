
'use client'
import Link from "next/link";
import UserDropDown from '../userDropDownComponent/useDropDown';
import React from 'react';
export default function Navbar() {

    return (
        <header id="header" className="col-md-12">
            <nav id="nav-1" className="navbar navbar-expand-xl navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link " href="/animals/index" aria-current="page">Inicio</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Módulo de Animales
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="/navbarDropdown">
                                    <li><Link className="dropdown-item" href="/animals/index">Listado de animales activos</Link></li>
                                    <li><Link className="dropdown-item" href="/animals/dead">Listado de animales fallecidos</Link></li>
                                    <li><Link className="dropdown-item" href="/animals/all">Listado de todos los animales registrados</Link></li>
                                    <li><Link className="dropdown-item" href="/animals/register">Registrar un nacimiento</Link></li>
                                    <li><Link className="dropdown-item" href="/animals/search">Buscar un animal</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="/purchases/index/" id="navbarDropdown"
                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Módulo de
                                    Compras</Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" href="/purchases/index/">Listado animales
                                        comprados</Link></li>
                                    <li><Link className="dropdown-item" href="/purchases/register/">Registrar compras</Link>
                                    </li>
                                    <li><Link className="dropdown-item" href="/purchases/search/">Consultar compras por
                                        fecha</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="/sales/register/" id="navbarDropdown"
                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Módulo de
                                    Ventas</Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" href="/sales/index/">Listado animales vendidos</Link>
                                    </li>
                                    <li><Link className="dropdown-item" href="/sales/register/">Registrar ventas</Link></li>
                                    <li><Link className="dropdown-item" href="/sales/search/">Consultar ventas por fecha</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="/incidents/register/" id="navbarDropdown"
                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Módulo de
                                    Incidentes</Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" href="/incidents/index/">Listado de incidentes</Link>
                                    </li>
                                    <li><Link className="dropdown-item" href="/incidents/register/">Registrar un
                                        incidentes</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="/injectables/register/" id="navbarDropdown"
                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Módulo de
                                    Inyectables</Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" href="/injectables/index/">Listado inyectables
                                        aplicados</Link></li>
                                    <li><Link className="dropdown-item" href="/injectables/register/">Registrar aplicación
                                        de inyectable</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="/notifications/index/" id="navbarDropdown"
                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Módulo de
                                    Notificaciones</Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item"
                                        href="/notifications/index/notificaciones activas">Listado de
                                        notificaciones activas</Link></li>
                                    <li><Link className="dropdown-item"
                                        href="/notifications/checked/notificaciones vistas">Listado de
                                        notificaciones vistas</Link></li>
                                    <li><Link className="dropdown-item"
                                        href="/notifications/indexAll/todas las notificaciones">Listado de todas
                                        las notificaciones</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown"
                                    role="button" data-toggle="dropdown" href="/statistics/index" aria-haspopup="true" aria-expanded="false">Módulo de
                                    Estadísticas</Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" href="/statistics/index">Estadísticas globales</Link></li>
                                    <li><Link className="dropdown-item" href="/statistics/auctions">Estadísticas de subastas</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                           <UserDropDown/>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
