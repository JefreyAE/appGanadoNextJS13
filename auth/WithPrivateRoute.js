'use client'
import { validateJWT, useValidateJWT } from '../helpers/JWTTools'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getCookie } from 'cookies-next'

const WithPrivateRoute = ({ children }) => {

    const [tokenCookie, setTokenCookie] = useState(`${getCookie('token')}`)
    const [show, setShow] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const { isValid, setToken } = useValidateJWT(tokenCookie)

    useEffect(() => {   
        console.log(`${getCookie('token')}`);
        setToken(`${getCookie('token')}`)    
        if (pathname === '/' || pathname === '/login') {
            setShow(true)
        } else {
            const checkAuth = () => {
                if (!isValid) {
                    router.push('/');
                } else {
                    setShow(true)
                }
            }
            checkAuth()
        }
    }, [,isValid])

    return show ? <>{children}</> : null
};

export default WithPrivateRoute;