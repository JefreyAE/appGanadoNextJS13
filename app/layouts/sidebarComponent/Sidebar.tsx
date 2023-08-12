'use client'
import { useEffect, useState } from "react";
import DropDownSidebar from "./DropDownSidebar";
import { herdListOptions, animalListOptions, purchaseListOptions, salesListOptions, incidentListOptions, injectablesListOptions, notificationsListOptions, statisticsListOptions } from '../navigationsOptions'

export default function SideBarNavigation() {

    const [isVisible, setIsVisible] = useState(true)
    const [heightStyle, setHeightStyle] = useState({})

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateHeight = () => {
                var viewportHeight = window.innerHeight * 0.945;
                setHeightStyle({ display: 'flex', maxHeight: viewportHeight, minHeight: viewportHeight })
            }
            updateHeight()
            window.addEventListener("resize", updateHeight)
            return () => {
                window && window.removeEventListener("resize", updateHeight)
            }
        }
    }, [])

    return (
        <div style={heightStyle}>
            {!isVisible &&
                <div className="sidebar-closed" id="sidebar-closed">
                    <div className="sidebar-header-closed">
                        <button className="open-btn" onClick={e => setIsVisible(!isVisible)}>☰</button>
                    </div>
                </div>
            }
            {isVisible &&
                <div className="sidebar" id="sidebar" >
                    <div className="sidebar-header">
                        <button className="close-btn" onClick={e => setIsVisible(!isVisible)}><span className="fa-solid fa-xmark"></span></button>
                    </div>
                    <ul className="sidebar-menu">
                        <DropDownSidebar listElments={herdListOptions} title="Mis Hatos" />
                        <DropDownSidebar listElments={animalListOptions} title="Mis Animales" />
                        <DropDownSidebar listElments={purchaseListOptions} title="Módulo de Compras" />
                        <DropDownSidebar listElments={salesListOptions} title="Módulo de Ventas" />
                        <DropDownSidebar listElments={incidentListOptions} title="Módulo de Incidentes" />
                        <DropDownSidebar listElments={injectablesListOptions} title="Módulo de Inyectables" />
                        <DropDownSidebar listElments={notificationsListOptions} title="Módulo de Notificaciones" />
                        <DropDownSidebar listElments={statisticsListOptions} title="Módulo de Estadísticas" />
                    </ul>
                </div>
            }
        </div>
    )
}