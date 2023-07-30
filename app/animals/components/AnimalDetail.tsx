'use client'
import AnimalService from "../../../services/animalService";
import React, { useState } from "react";
import Animal from "../../../models/animal";
import { toast } from 'react-toastify';
import AnimalFormSection from "./formComponents/AnimalFormSection";
import { useRouter } from "next/navigation";

interface AnimalDetailInterface{
    animal: Animal,
    animals: Animal[]
}
export default function AnimalDetail({animal, animals}:AnimalDetailInterface) {

    const _animalService = new AnimalService();

    const [animalForm, setAnimalForm] = useState<Animal | undefined>()
    const [isValidAnimalForm, setIsValidAnimalForm] = useState(true)
    const router = useRouter()

    const getAnimalFormData = (callback: ()=>Animal) => {       
        setAnimalForm(callback());
    }

    const animalValidationForm = (callback: ()=>boolean) => {
        setIsValidAnimalForm(callback())
    }

    const update = (e:any) => {
        e.preventDefault();
        if (isValidAnimalForm) {
            animalForm && _animalService.update(animalForm);
        }else{
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    const deleteAnimal = (e:any) => {
        e.preventDefault()
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");

        if (confirmDelete) {
            _animalService.delete(animal.id)
                .finally(() => {
                    router.push('/animals/index');
                })
        }
    }

    return (
        <section className="frontend row justify-content-center">
            <h1 className="titulo col-md-12">Detalles del animal</h1>
            <div className="form col-lg-8" id='formDetailAnimal'>
                <h2 className="titulo-2">Información general</h2>
                <form id="form-detail-update" onSubmit={update} className="form_data form-group row">
                    <AnimalFormSection
                        animal={animal}
                        animals={animals}
                        getAnimalFormData={getAnimalFormData}
                        action={'update'}
                        animalValidationForm={animalValidationForm}
                        isFormDisabled={true}
                        deleteAnimal={deleteAnimal}
                    />
                </form>
            </div>
        </section>
    );
}