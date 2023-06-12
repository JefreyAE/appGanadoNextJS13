'use client'
import AnimalService from "../../services/animalService";
import { useState } from "react";
import React from "react";
import AnimalForm from './AnimalForm'
import Animal from "../../models/animal";
import { ToastContainer, toast } from 'react-toastify';

interface AnimalDetailInterface{
    animal: Animal,
    animals: Animal[]
}
export default function AnimalDetail(props:AnimalDetailInterface) {

    let _animalService = new AnimalService();

    let update = (animal:Animal) => {
        _animalService.update(animal)
            .then((response) => {
                if (!response.ok) {           
                  throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.status) {
                    if(data.status === 'success'){        
                        toast.success(data.message, {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 3000,
                          });
                    }
                    if(data.status === 'error'){
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

    return (
        <section className="frontend row justify-content-center">
            <h1 className="titulo col-md-12">Detalles del animal</h1>
            <div className="form col-lg-8" id='formDetailAnimal'>
                <h2 className="titulo-2">Información general</h2>
                <AnimalForm animal={props.animal} animals={props.animals} propFunction={update} propAction={'update'}/>    
            </div>
        </section>
    );
}