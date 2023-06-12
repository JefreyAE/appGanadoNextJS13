'use client'
import Link from 'next/link'
import { isUserLoggedIn } from '../../helpers/auth'
import { useEffect } from 'react';


export default function UserDropDown(){
    let logOut = (e) => {
        sessionStorage.removeItem('token');
        window.location.href = '/';
    } 
    return(
        <li className="nav-item dropdown" >
            <a className="nav-link dropdown-toggle" 
                id="navbarDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">Cuenta</a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" href="/user/profile">Cambio de contraseña</Link></li>
                <li><button onClick={logOut} className="dropdown-item" href="/user/logout/">Cerrar sesión</button></li>
            </ul>
        </li>
    )
}