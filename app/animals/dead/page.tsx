'use client'
import { useEffect, useState } from "react";
import AnimalsList from "../components/AnimalsList";
import AnimalService from "../../services/animalService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Dead() {
    const [listDead, setList] = useState([]);
    let _animalService = new AnimalService();

    useEffect(() => {
        _animalService.dead()
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setList(data.listDead);
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            });
    }, []);
    return (
        <>        
            <AnimalsList title="Listado de animales fallecidos" list={listDead} />
            <ToastContainer />
        </>

    )
}