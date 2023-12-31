'use client'
import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Constants from '../../../../helpers/constants'
import { useContext } from 'react'
import { UserContext } from '../../../../contexts/userContext'

interface UserDropDownProps {
    collapseNavbar?: ()=>void 
}

export default function UserDropDown({collapseNavbar}:UserDropDownProps) {

    const router = useRouter()
    const { userContext } = useContext(UserContext)
    const constants = new Constants();
    
    const logOut = (e:any) => {
        deleteCookie('token')
        router.push('/');
    }

    const avatarStyle = {
        marginRight: "0px"
    };
      
    return (
        <>
            <li className="nav-item dropdown nav-item-custom" >
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cuenta</a>
                <ul className="dropdown-menu" id="user-dropdown-account" aria-labelledby="navbarDropdown">
                    <li><Link onClick={collapseNavbar} className="dropdown-item" href="/users/profile">Mi perfil</Link></li>
                    <li><Link onClick={collapseNavbar} className="dropdown-item" href="/users/editPassword">Cambio de contraseña</Link></li>
                    {userContext && userContext.role === '1' && <li><Link className="dropdown-item" href="/users/admin/index">Administrar Usuarios</Link></li>}
                    <div className="dropdown-divider"></div>
                    <li><button onClick={logOut} className="dropdown-item" >Cerrar sesión</button></li>
                </ul>
            </li>
            <li className="nav-item dropdown user-logo" style={avatarStyle}>
                <Link onClick={collapseNavbar} href="/users/profile">
                    {userContext.avatar ? 
                        <img id="img-logo" src={constants.getUrlApi() + '/api/user/image/' + userContext.avatar} alt="" />
                        :
                        <img id="img-logo" src="/images/logoUser.jpg" alt="" />}
                </Link>
            </li>
        </>
    )
}