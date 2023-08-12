'use client'
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import UserService from "../../../services/userService";
import 'react-toastify/dist/ReactToastify.css';
import InputPasswordWithLabel from "../../components/formComponents/InputPasswordWithLabel";
import InputTextWithLabel from "../../components/formComponents/InputTextWithLabel";
import User from "../../../models/user";
import { setCookie } from "cookies-next";
import Constants from "../../../helpers/constants";
import { validateFormInputs } from "../../../helpers/validationsTool";
import { ValidationObject } from "../../../types/types";
import ButtonsBar from "../../components/ButtonsBar";

export default function EditProfile() {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('x')
    const [contact_email, setContact_email] = useState('')
    const [phone_number, setPhone_number] = useState('')

    const _userService = new UserService()
    const [user, setUser] = useState<User>()
    const constants = new Constants()

    useEffect(() => {
        _userService.myProfile().
            then((data) => {
                setUser(data.user)
            })
    }, [])

    useEffect(() => {
        const inputs:ValidationObject[] = [
            {type: "alfanumerico", name:"surname", value:surname},
            {type: "alfanumerico", name:"name", value:name},
            {type: "passwordLogin", name:"password", value:password},
            {type: "email", name:"email", value:email},
            {type: "email", name:"contact_email", value:contact_email},
            {type: "alfanumerico", name:"phone_number", value:phone_number},
        ]
        validateFormInputs(inputs)  
    }, [name, surname, email, password, contact_email, phone_number])

    const update = (e: React.FormEvent) => {
        e.preventDefault()
        const user = new User(null, name, email, password, contact_email, phone_number, null, surname, null,null)

        const inputs:ValidationObject[] = [
            {type: "alfanumerico", name:"surname", value:surname},
            {type: "alfanumerico", name:"name", value:name},
            {type: "passwordLogin", name:"password", value:password},
            {type: "email", name:"email", value:email},
            {type: "email", name:"contact_email", value:contact_email},
            {type: "alfanumerico", name:"phone_number", value:phone_number},
        ]
        if (validateFormInputs(inputs)) {  
            _userService.updateProfile(user)
                .then((data) => {
                    if (data && data.status === 'success') {
                        setCookie('token', JSON.stringify(data.token), { maxAge: constants.getTokenExpirationTime()});
                    }
                });
        } else {
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    return (
        <>
        <ButtonsBar />
        <div className="col-md-12 row justify-content-center">
            <section className="frontend row justify-content-center col-md-8">
                <h1 className="titulo col-md-12">Actualización de datos de la cuenta</h1>
                <div className="form col-md-10" id='formUpdateUser'>
                    <form onSubmit={update} autoComplete="nope" className="form_data mt-2">
                        <InputTextWithLabel
                            title="Ingrese su nuevo nombre"
                            setData={setName}
                            name="name"
                            placeholder=""
                            defaultValue={user?.name ? user?.name : undefined}
                        />
                        <InputTextWithLabel
                            title="Ingrese sus apellidos"
                            setData={setSurname}
                            name="surname"
                            placeholder=""
                            defaultValue={user?.surname ? user?.surname : undefined}
                        />
                        <InputTextWithLabel
                            title="Ingrese su nuevo correo de cuenta"
                            setData={setEmail}
                            name="email"
                            placeholder="Nuevo correo"
                            defaultValue={user?.email}
                        />
                        <InputTextWithLabel
                            title="Ingrese su nuevo correo de contacto"
                            setData={setContact_email}
                            name="contact_email"
                            placeholder=""
                            type="email"
                            defaultValue={user?.contact_email ? user?.contact_email : undefined}
                        />
                        <InputTextWithLabel
                            title="Ingrese su nuevo número de teléfono"
                            setData={setPhone_number}
                            name="phone_number"
                            placeholder="7777-7777"
                            defaultValue={user?.phone_number ? user?.phone_number : undefined}
                            isRequired={false}
                        />
                        <InputPasswordWithLabel
                            title="Ingrese su contraseña para validar los cambios"
                            setData={setPassword}
                            name="password"
                            placeholder="Contraseña"
                        />
                        <button type="submit" className="large green button-login mt-3 mb-3" id="btnLogin" >Actualizar datos</button>
                    </form>
                </div>
                <ToastContainer />
            </section>
        </div>
        </>
    )
}