'use client'
import React, { useEffect, useState, useContext } from 'react'
import { redirect } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SpinnerLoading from '../../components/SpinnerLoading'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import InputPasswordWithLabel from '../../components/formComponents/InputPasswordWithLabel'
import UserService from '../../../services/userService'
import Constants from '../../../helpers/constants'
import { UserContext } from '../../../contexts/userContext'
import InputTextWithLabel from '../../components/formComponents/InputTextWithLabel'
import { validateFormInputs } from '../../../helpers/validationsTool'
import { ValidationObject } from '../../../types/types'
import { getUserDataJWT, validateJWT } from '../../../helpers/JWTTools'
import InputPassword from '../../components/formComponents/InputPassword'
import InputText from '../../components/formComponents/InputText'

interface State {
    message: string;
}

export default function Login() {

    const _userService = new UserService()
    const constants = new Constants()
    const { updateUser } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [state, setState] = useState<State>({
        message: "",
    })
    useEffect(() => {
        if (validateJWT()) {
            redirect('/main');
        }else{   
            deleteCookie('token')
            sessionStorage.removeItem('token');
        }     
    }, [])

    useEffect(() => {
        const inputs: ValidationObject[] = [
            { type: "passwordLogin", name: "password", value: password },
        ]
        password && password !== '' && validateFormInputs(inputs)
    }, [password])

    const loguear = (e: React.FormEvent) => {
        e.preventDefault();

        const inputs: ValidationObject[] = [
            { type: "passwordLogin", name: "password", value: password },
        ]

        if (validateFormInputs(inputs)) {
            setIsLoading(true);
            try {
                _userService.login(email, password)
                    .then(data =>{
                        if (data.status === 'success') {
                            const strToken = JSON.stringify(data.token)
                            const cookieOptions = {
                                 SameSite: "none", 
                                 maxAge: constants.getTokenExpirationTime(), 
                               };
                            setCookie('token', strToken, cookieOptions)
                            let user = getUserDataJWT(data.token)                          
                            updateUser(user)
                            window.location.href = '/main';       
                        } else {
                            setIsLoading(false)
                            setState((prevState) => ({...prevState, message: data.message }))
                            deleteCookie('token')
                        }
                    })       
            } catch (error) {
                setIsLoading(false)
                toast.error("Ha ocurrido un error al ingresar.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            }
        }
    }
        return (
            <>
                {!isLoading && <div className="form col-lg-4" id='formLogin'>
                    <h2>Ingresa tus credenciales</h2>
                    <form onSubmit={loguear} id="form">
                        <InputTextWithLabel
                            title='Correo Electrónico:'
                            type='text'
                            name='email'
                            placeholder='@'
                            setData={setEmail}
                            isRequired={true}
                        />
                        <InputPasswordWithLabel
                            title="Contraseña:"
                            setData={setPassword}
                            name="password"
                            placeholder=""
                            autoComplete="new-password"
                        />
                        {state.message != "" &&
                            <div className='error'>{state.message}</div>
                        }
                        <button type="submit" className="large green button-login mt-3 mb-3" id="btnLogin" >Ingresar</button>
                    </form>
                </div>}
                <ToastContainer />
                {isLoading && <SpinnerLoading />}
            </>
        )
    
}