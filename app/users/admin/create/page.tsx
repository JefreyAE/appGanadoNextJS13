'use client'
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserService from "../../../../services/userService";
import InputTextWithLabel from "../../../components/formComponents/InputTextWithLabel";
import InputPasswordWithLabel from "../../../components/formComponents/InputPasswordWithLabel";
import Validations from "../../../../helpers/validations";
import { validateFormInputs } from "../../../../helpers/validationsTool";
import useAdminAuthorization from "../../../../hooks/useAdminAuthorization";
import { ValidationObject } from "../../../../types/types";

export default function CreateUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    useAdminAuthorization(true)

    const _userService = new UserService()
    const validate = new Validations()

    const register = (e: any) => {
        e.preventDefault();

        const inputs:ValidationObject[] = [
            {type: "alfanumerico", name:"name", value:name},
            {type: "email", name:"email", value:email},
            {type: "password", name:"password1", value:password1},
            {type: "password", name:"password2", value:password2}
        ]

        if (validateFormInputs(inputs)) {
            const user = {email:email, password1:password1, password2:password2, name:name}
            _userService.registerByAdmin(user);
        }else{
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    const checkPasswordMatch = () => {
        validate.validarPasswordMatch('password2', password1, password2)
        if(password1 !== password2){
            toast.error("Las contraseñas no coinciden", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }    
    }

    return (
        <>
            <section className="frontend row justify-content-center">
                <h1 className="titulo col-md-12">Registrar nuevo usuario</h1>
                <div className="form col-lg-8" >
                    <form id="form-detail-update" onSubmit={register} className="form_data form-group">
                        <InputTextWithLabel setData={setName} title={"Ingrese el nombre del usuario"} name={"name"} />
                        <InputTextWithLabel setData={setEmail} title={"Ingrese el correo de cuenta"} name={"email"} type="email" />
                        <InputPasswordWithLabel setData={setPassword1} title="Ingrese la contraseña" name="password1" />
                        <InputPasswordWithLabel onBlur={checkPasswordMatch} setData={setPassword2} title="Ingrese nuevamente la contraseña" name="password2" />
                        <input type="submit" className="btn btn-success btn-lg btn-block" value="Registrar" id="btnRegister" />
                    </form>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}