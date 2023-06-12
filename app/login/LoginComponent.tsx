'use client'
import React, { useEffect, useRef, useState } from 'react'
import LoginService from "../services/loginService.js";

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

export default function LoginComponent() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const _loginService = new LoginService();

    const [state, setState] = useState<State>({
        message: "",
        contador: 0,
        user: { name: '', email: '', password: '' },
    })
    useEffect(() => {
        sessionStorage.removeItem('token');
    })

    const loguear = (e: React.FormEvent) => {
        e.preventDefault();

        if (emailRef.current && passwordRef.current) {

            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            _loginService
                .login("", email, password)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status) {
                        setState((prevState) => ({ ...prevState, message: data.message }));
                        window.location.href = '/';
                        sessionStorage.removeItem('token');
                    } else {
                        let token = data;
                        sessionStorage.setItem('token', JSON.stringify(token));
                        window.location.href = '/main';
                    }
                })
                .catch((error) => {
                    // Maneja el error aquí
                    console.error(error);
                });
        }
    }

    return (
        <>
            <div className="form col-lg-4" id='formLogin'>
                <h2>Ingrese sus credenciales</h2>
                <form onSubmit={loguear} id="formLog">
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico:</label>
                        <input className="form-control" ref={emailRef} id="email" name='email' type="email" placeholder="@" autoFocus required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña:</label>
                        <input className="form-control" ref={passwordRef} id="password" name="password" type="password" placeholder="Contraseña" required pattern="[a-zA-Z0-9]+" />
                    </div>
                    {state.message != "" &&
                        <div className='error'>{state.message}</div>
                    }
                    <button type="submit" className="large green button-login " id="btnLogin" >Ingresar</button>
                </form>
            </div>
        </>
    )
}