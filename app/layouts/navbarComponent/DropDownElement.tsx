import Link from "next/link";

type ListElements = {
    description: string
    url: string
}

interface DropDownElementProp {
    title: string
    listElments: ListElements[]
}
export default function DropDownElement({ title, listElments }: DropDownElementProp) {
    return (
        <li className="nav-item dropdown dropdown-responsive">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {title}
            </a>
            <ul className="dropdown-menu" aria-labelledby="/navbarDropdown">
                {listElments && listElments.map((elementList: ListElements, key) => {
                        return (
                            <li key={key}><Link className="dropdown-item" href={elementList.url}>{elementList.description}</Link></li>
                        )
                    })
                }
            </ul>
        </li>
    )
}