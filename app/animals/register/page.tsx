'use client'
import Animal from "../../../models/animal";
import AnimalService from "../../../services/animalService";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AnimalFormSection from "../components/formComponents/AnimalFormSection";
import ButtonsBar from "../../components/ButtonsBar";

export default function Register() {

    const _animalService = new AnimalService();
    const [animals, setAnimals] = useState([]);

    const [animalForm, setAnimalForm] = useState<Animal | undefined>()
    const [isValidAnimalForm, setIsValidAnimalForm] = useState(true)

    const getAnimalFormData = (callback: () => Animal) => {
        setAnimalForm(callback());
    }
    const animalValidationForm = (callback: () => boolean) => {
        setIsValidAnimalForm(callback())
    }

    const register = (e: any) => {
        e.preventDefault();
        if (isValidAnimalForm) {   
            animalForm && _animalService.register(animalForm);
        } else {
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    useEffect(() => {
        _animalService.index()
            .then((data) => {
                data && setAnimals(data.listActive);
            })
    }, [])

    return (
        <>
            <ButtonsBar />
            <section className="frontend row justify-content-center">
                <h1 className="titulo col-md-12">Registro de animales</h1>
                <div className="form col-lg-8" >
                    <form id="form-detail-update" onSubmit={register} className="form_data form-group row">
                        <AnimalFormSection
                            animal={animalForm}
                            animals={animals}
                            getAnimalFormData={getAnimalFormData}
                            action={'register'}
                            animalValidationForm={animalValidationForm}
                        />
                        <input type="submit" className="btn btn-success btn-lg btn-block" value="Registrar" id="btnRegister" />
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )

}