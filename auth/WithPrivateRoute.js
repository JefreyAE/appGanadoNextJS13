'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'
import {  validateJWT } from '../helpers/JWTTools';

const WithPrivateRoute = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (pathname === '/' || pathname === '/login') {
            setShow(true)
        } else {
            const checkAuth = () => {
                if (!validateJWT()) {
                    router.push('/')
                } else {
                    setShow(true)
                }
            };
            checkAuth()
        }
    }, [pathname])

    return show ? <>{children}</> : null
};

export default WithPrivateRoute;
