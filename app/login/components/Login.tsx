'use client'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SpinnerLoading from '../../components/SpinnerLoading'
import { deleteCookie, setCookie } from 'cookies-next';
import InputPasswordWithLabel from '../../components/formComponents/InputPasswordWithLabel'
import UserService from '../../../services/userService'
import Constants from '../../../helpers/constants'
import { UserContext } from '../../../contexts/userContext'
import InputTextWithLabel from '../../components/formComponents/InputTextWithLabel'
import { validateFormInputs } from '../../../helpers/validationsTool'

type ValidationObject = {
    type: string
    name: string;
    value: any
}
interface User {
    name: string;
    email: string;
    password: string;
}

interface State {
    message: string;
    contador: number;
    user: User;
}

export default function Login() {

    const _userService = new UserService()
    const constants = new Constants()
    const { updateUser } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const router = useRouter()

    const [state, setState] = useState<State>({
        message: "",
        contador: 0,
        user: { name: '', email: '', password: '' },
    })
    useEffect(() => {
        deleteCookie('token')
        sessionStorage.removeItem('token');
    }, [])

    useEffect(() => {
        const inputs: ValidationObject[] = [
            { type: "passwordLogin", name: "password", value: password },
        ]
        password && password !== '' && validateFormInputs(inputs)
    }, [password])

    const styleNone = {
        "display": "none"
    }
    const styleShow = {
        "display": "block"
    }

    const loguear = (e: React.FormEvent) => {
        e.preventDefault();

        const inputs: ValidationObject[] = [
            { type: "passwordLogin", name: "password", value: password },
        ]
        
        if (validateFormInputs(inputs)) {
            setIsLoading(true);
            _userService.login(email, password)
                .then((data) => {
                    if (data.status === 'success') {
                        setCookie('token', JSON.stringify(data.token), { maxAge: constants.getTokenExpirationTime() });
                        updateUser(data.user)
                        router.push('/main')
                    } else {
                        setIsLoading(false)
                        setState((prevState) => ({ ...prevState, message: data.message }));
                        deleteCookie('token')
                    }
                })
                .catch((error) => {
                    setIsLoading(false)
                    toast.error("A ocurrido un error al ingresar.", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                    });
                });
        }
    }

    return (
        <>
            <div className="form col-lg-4" id='formLogin' style={isLoading ? styleNone : styleShow}>
                <h2>Ingrese sus credenciales</h2>
                <form onSubmit={loguear} id="formLog">
                    <InputTextWithLabel
                        title='Correo Electrónico:'
                        type='email'
                        name='email'
                        placeholder='@'
                        setData={setEmail}
                        defaultValue=""
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
            </div>
            <ToastContainer />
            <div style={!isLoading ? styleNone : styleShow}>
                <SpinnerLoading />
            </div>
        </>
    )
}