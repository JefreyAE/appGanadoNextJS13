

import { setCookie } from 'cookies-next'
import SessionService from '../services/sessionService'
import {refreshTimeJWT, validateJWT} from './JWTTools'
import Constants from './constants'

export function checkAuth(){

    if (!validateJWT()) {
       window.location.href = '/';
    }

    const constants = new Constants()
    const _sessionService = new SessionService()

    if (refreshTimeJWT()) {
        _sessionService.resfreshToken()
            .then(response => response.json())
            .then((data)=>{
                if(data.status === 'success'){
                    const strToken = JSON.stringify(data.token)
                    const maxAge = constants.getTokenExpirationTime()
                    const cookieOptions = {
                        SameSite: "none", 
                        maxAge: maxAge, 
                      };
                    setCookie('token', strToken, cookieOptions)            
                }
            }).catch(error=>{});
    }
}