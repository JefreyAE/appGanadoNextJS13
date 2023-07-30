'use client'
import Herd from "../../../models/herds";
import HerdForm from "../components/HerdForm";
import { useState } from 'react'
import HerdService from "../../../services/herdService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ButtonsBar from "../../components/ButtonsBar";

export default function Register(){

    const [ herd, setHerd ] = useState<Herd>({} as Herd)
    const [isValidHerdForm, setIsValidHerdForm] = useState(true)
    const _herdService = new HerdService();
    
    const register = (e: any) => {
        e.preventDefault();       
        if (isValidHerdForm) {
            herd && _herdService.register(herd);
        } else {
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    const getHerdFormData = (callback: () => Herd) => {
        setHerd(callback());
    }
    const herdValidationForm = (callback: ()=>boolean) => {
        setIsValidHerdForm(callback())
    }

    return (
        <>
            <ButtonsBar />
            <section className="frontend row justify-content-center">
                <h1 className="titulo col-md-12">Detalles del hato</h1>
                <div className="form col-lg-8" id='formDetailAnimal'>
                    <h2 className="titulo-2">Información general</h2>
                    <form id="form-detail-update" onSubmit={register} className="form_data form-group row">
                        <HerdForm
                            herd={herd}
                            getHerdFormData={getHerdFormData}
                            isFormDisabled={false}
                            herdValidationForm={herdValidationForm}
                        />
                        <input type="submit" className="btn btn-success btn-lg btn-block" value="Registrar" id="btnRegister" />
                    </form>
                </div>
            </section>
        </>
    );
}