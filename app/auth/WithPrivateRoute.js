'use client'
import validateJWT from '../helpers/validateJWT';
import { useEffect, useState } from 'react';

const WithPrivateRoute = ({ children }) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        const checkAuth = () =>{
            if (!validateJWT()) {
                window.location.href = '/login';
            }else{
                setShow(true)
            }
        }
        checkAuth()
    },[])

    return show ? <>{children}</> : null
};

export default WithPrivateRoute;