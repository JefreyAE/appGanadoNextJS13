
'use client'

import { useEffect, useState } from "react";
import DropDownSidebar from "./DropDownSidebar";
import { herdListOptions, animalListOptions, purchaseListOptions, salesListOptions, incidentListOptions, injectablesListOptions, notificationsListOptions, statisticsListOptions } from '../navigationsOptions'

export default function SideBarNavigation() {

    const [isVisible, setIsVisible] = useState(true)
    const [heightStyle, setHeightStyle] = useState({})

    const toggleSidebar = () => {
        setIsVisible(isVisible ? false : true)
    }

    const hidde = {display: 'none'}
    const show = {display: 'block'}

    useEffect(() => {
        const updateHeight = () => {
            var viewportHeight = window.innerHeight;
            setHeightStyle({ display: 'flex', minHeight: viewportHeight })
        }
        updateHeight()
        window.addEventListener("resize", updateHeight)
        return () =>{
            window && window.removeEventListener("resize", updateHeight)
        }

    }, [])

    return (
        <div style={heightStyle}>
            <div className="sidebar-closed" id="sidebar-closed" style={!isVisible ? show : hidde}>
                <div className="sidebar-header-closed">
                    <button className="open-btn" onClick={toggleSidebar}>☰</button>
                </div>
            </div>
            <div className="sidebar" id="sidebar" style={isVisible ? show : hidde}>
                <div className="sidebar-header">
                    <button className="close-btn" onClick={toggleSidebar}><span className="fa-solid fa-xmark"></span></button>
                </div>
                <ul className="sidebar-menu">
                    <DropDownSidebar listElments={herdListOptions} title="Módulo de Hatos" />
                    <DropDownSidebar listElments={animalListOptions} title="Módulo de Animales" />
                    <DropDownSidebar listElments={purchaseListOptions} title="Módulo de Compras" />
                    <DropDownSidebar listElments={salesListOptions} title="Módulo de Ventas" />
                    <DropDownSidebar listElments={incidentListOptions} title="Módulo de incidentes" />
                    <DropDownSidebar listElments={injectablesListOptions} title="Módulo de Inyectables" />
                    <DropDownSidebar listElments={notificationsListOptions} title="Módulo de Notificaciones" />
                    <DropDownSidebar listElments={statisticsListOptions} title="Módulo de Estadísticas" />               
                </ul>
            </div>
        </div>
    )
}