'use client'
import Animal from "../../models/animal";
import AnimalService from "../../services/animalService";
import React, { useEffect, useState } from "react";
import AnimalForm from "../components/AnimalForm";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

    let _animalService = new AnimalService();
    const [animals, setAnimals] = useState([]);

    let register = (animal: Animal) => {
        _animalService.register(animal)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.status) {
                    console.log(data);        
                    if (data.status === 'success') {
                        toast.success(data.message, {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 3000,
                        });
                    }
                    if (data.status === 'error') {
                        toast.error(data.message, {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 3000,
                        });
                    }
                }
            }).catch(error => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            });
    }

    useEffect(() => {
        _animalService.index()
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {            
                setAnimals(data.listActive);
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            });
    }, [])

    return (
        <section className="frontend row justify-content-center">
            <h1 className="titulo col-md-12">Registro de animales animal</h1>
            <div className="form col-lg-8" id='formDetailAnimal'>
                <h2 className="titulo-2">Información general</h2>
                <AnimalForm animal={{}} animals={animals} propFunction={register} propAction={"register"} />
                <ToastContainer />
            </div>
        </section>
    );

}