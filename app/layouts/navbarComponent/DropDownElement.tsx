
import Link from "next/link";
import { ListElements } from "../../../types/types";
interface DropDownElementProp {
    title: string
    listElments: ListElements[]
    collapseNavbar?: ()=>void
}
export default function DropDownElement({ title, listElments, collapseNavbar }: DropDownElementProp) {
    return (
        <li className="nav-item dropdown dropdown-responsive">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {title}
            </a>
            <ul className="dropdown-menu" aria-labelledby="/navbarDropdown">
                {listElments && listElments.map((elementList: ListElements, key) => {
                        return (
                            <li key={key}><Link onClick={collapseNavbar} className="dropdown-item" href={elementList.url}>{elementList.description}</Link></li>
                        )
                    })
                }
            </ul>
        </li>
    )
}