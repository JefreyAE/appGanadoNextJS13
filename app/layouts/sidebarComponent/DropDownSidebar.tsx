import Link from "next/link";
import { useState } from "react";
import { ListElements } from "../../../types/types";

interface DropDownElementProp {
    title: string
    listElments: ListElements[]
}
export default function DropDownSidebar({ title, listElments }: DropDownElementProp) {

    const [isVisible, setIsVisible] = useState(false)
    
    const hidde = {
        display: 'none'
    }

    const show = {
        display: 'block'
    }

    const toggleSubmenu = (e:any) => {
        e.stopPropagation()
        setIsVisible(isVisible ? false : true)
    }

    return (
        <li onClick={toggleSubmenu}>
            <span className="sidebar-item-title"><span className={`ml-2 mr-2 ${!isVisible ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down'}`} />{title} </span>
            <ul className="sub-menu" style={isVisible ? show : hidde}>
            {listElments && listElments.map((elementList: ListElements, key) => {
                        const handleItemClick = (e:any) => {
                            e.stopPropagation(); 
                          };
                        return (
                            <li className="ml-5" key={key}><Link onClick={handleItemClick} href={elementList.url}>{elementList.description}</Link></li>
                        )
                    })
                }
            </ul>
        </li>
    )
}