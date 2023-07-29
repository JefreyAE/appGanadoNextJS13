'use client'
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import UserService from "../../../services/userService";
import Validations from "../../../helpers/validations";
import 'react-toastify/dist/ReactToastify.css';
import InputPasswordWithLabel from "../../components/formComponents/InputPasswordWithLabel";
import { validateFormInputs } from "../../../helpers/validationsTool";

type ValidationObject = {
    type: string
    name: string;
    value: any
}

export default function Credentials() {

    const [passwordCurrent, setPasswordCurrent] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const _userService = new UserService()
    const validate = new Validations();

    const update = (e: React.FormEvent) => {
        e.preventDefault();

        const inputs:ValidationObject[] = [
            {type: "password", name:"password1", value:password1},
            {type: "password", name:"password2", value:password2},
            {type: "password", name:"passwordCurrent", value:passwordCurrent},
        ]
        if (validateFormInputs(inputs)) {   
            _userService.updatePassword(password1, password2, passwordCurrent);
        } else {
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    useEffect(() => {
        const inputs:ValidationObject[] = [
            {type: "password", name:"password1", value:password1},
        ]
        password1 !== '' && validateFormInputs(inputs)
    }, [password1])

    useEffect(() => {
        const inputs:ValidationObject[] = [    
            {type: "password", name:"password2", value:password2},
        ]
        password2 !== '' && validateFormInputs(inputs)
    }, [password2])

    useEffect(() => {
        const inputs:ValidationObject[] = [
            {type: "password", name:"passwordCurrent", value:passwordCurrent},
        ]
        passwordCurrent !== '' && validateFormInputs(inputs)
    }, [passwordCurrent])

    return (
        <div className="col-md-12 row justify-content-center">
            <section className="frontend row justify-content-center col-md-8">
                <h1 className="titulo col-md-12">Cambio de contraseña</h1>
                <div className="form col-md-10" id='formUpdateUser'>
                    <form onSubmit={update} className="form_data">
                        <InputPasswordWithLabel
                            title="Ingrese su contraseña actual"
                            setData={setPasswordCurrent}
                            name="passwordCurrent"
                            placeholder="Contraseña actual"
                        />
                        <InputPasswordWithLabel
                            title="Ingrese su nueva contraseña"
                            setData={setPassword1}
                            name="password1"
                            placeholder="Nueva contraseña"
                        />
                        <InputPasswordWithLabel
                            title="Repita su nueva contraseña"
                            setData={setPassword2}
                            name="password2"
                            placeholder="Ingrese nuevamente la contraseña"
                        />
                        <button type="submit" className="large green button-login mt-3 mb-3" id="btnLogin" >Actualizar contraseña</button>
                    </form>
                </div>
                <ToastContainer />
            </section>
        </div>
    )
}