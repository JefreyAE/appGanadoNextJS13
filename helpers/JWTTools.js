'use client'
import { getCookie } from 'cookies-next'
import Constants from './constants';
import { useEffect, useState } from 'react';

function useValidateJWT(tokenCookie){
    const [token, setToken] = useState(tokenCookie)
    const [isValid, setIsValid] = useState(false)
    useEffect(()=>{
        if (token) {
            const [header, payload, signature] = token.split('.');
            try {
                const decodedPayload = JSON.parse(atob(payload));
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedPayload.exp && decodedPayload.exp >= currentTime) {
                    setIsValid(true);
                } else {
                    setIsValid(false);
                }
            } catch (error) {
                console.error('Error al decodificar el payload del token:', error);
                setIsValid(false);
            }
        } else {
            setIsValid(false);
        }
    },[,token])
   
    return{
        isValid,
        setToken
    }
}

function validateJWT() {
    const token = `${getCookie('token')}`; 
    if (token) {
        const [header, payload, signature] = token.split('.');
        try {
            if(!payload){
                return false;
            }
            const decodedPayload = JSON.parse(atob(payload));
            const currentTime = Math.floor(Date.now() / 1000); // Obtiene la fecha actual en segundos

            if (decodedPayload.exp && decodedPayload.exp >= currentTime) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error al decodificar el payload del token:', error);
            return false;
        }
    } else {
        return false;
    }
}

function refreshTimeJWT() {
    const constants = new Constants()
    const token = `${getCookie('token')}`
    const tokenExpTime = constants.getTokenExpirationTime()
    
    if (token) {
        const [header, payload, signature] = token.split('.');
        try {
            const decodedPayload = JSON.parse(atob(payload));
            const currentTime = Math.floor(Date.now() / 1000); // Obtiene la fecha actual en segundos
            if (decodedPayload.exp && decodedPayload.exp >= currentTime) {
                let isTime = (decodedPayload.exp - currentTime) < tokenExpTime/2;
                return isTime;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error al decodificar el payload del token:', error);
            return false;
        }
    } else {
        return false;
    }
}

function getUserDataJWT(token){
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload
}

export { validateJWT, refreshTimeJWT, getUserDataJWT, useValidateJWT };

