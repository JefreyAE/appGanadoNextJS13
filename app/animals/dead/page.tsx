'use client'
import { useEffect, useState } from "react";
import AnimalsList from "../components/AnimalsList";
import AnimalService from "../../../services/animalService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ButtonsBar from "../../components/ButtonsBar";
import { ButtonsObject } from "../../../types/types";

export default function Dead() {
    const [listDead, setList] = useState<[]>();
    let _animalService = new AnimalService();

    useEffect(() => {
        _animalService.dead()
            .then((data) => {
                setList(data.listDead);
            })
    }, []);

    const buttons: ButtonsObject[] = [
        {description: 'Registrar animal', url: "/animals/register"}
    ]
    
    return (
        <>
            <ButtonsBar buttons={buttons} />
            {listDead && <AnimalsList title="Listado de animales fallecidos" list={listDead} /> }
            <ToastContainer />
        </>

    )
}