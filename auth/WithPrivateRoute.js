'use client'
import { validateJWT } from '../helpers/JWTTools'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const WithPrivateRoute = ({ children }) => {

    const [show, setShow] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {

            if (pathname === '/' || pathname === '/login') {
                setShow(true)
            } else {           
                const checkAuth = () => {
                    if (!validateJWT()) {
                        router.push('/');
                    } else {
                        setShow(true)
                    }
                }
                checkAuth()
            }
    }, [])

    return show ? <>{children}</> : null
};

export default WithPrivateRoute;