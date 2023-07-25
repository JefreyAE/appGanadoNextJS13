import { getCookie } from 'cookies-next'
import Constants from './constants';
function validateJWT() {
    const token = `${getCookie('token')}`; 
    if (token) {
        const [header, payload, signature] = token.split('.');
        try {
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

export { validateJWT, refreshTimeJWT };