'use client'
import React, { useEffect, useState } from "react";
import AnimalService from "../../../services/animalService";
import AnimalsList from "../components/AnimalsList";
import { ToastContainer } from "react-toastify";
import SpinnerLoading from "../../components/SpinnerLoading";
import 'react-toastify/dist/ReactToastify.css';
import ButtonsBar from "../../components/ButtonsBar";

type ButtonsObject = {
    description: string
    url: string
}
export default function Index() {

    const [listIndex, setListIndex] = useState<[]>()
    const _animalService = new AnimalService()

    useEffect(() => {
        _animalService.index()
            .then((data) => {
                data && setListIndex(data.listActive)
            })
    }, [])

    const buttons: ButtonsObject[] = [
        {description: 'Registrar animal', url: "/animals/register"}
    ]

    return (
        <>  
            <ButtonsBar buttons={buttons} />
            { listIndex && <AnimalsList list={listIndex} title="Listado de animales activos" /> }           
        </>
      );
}