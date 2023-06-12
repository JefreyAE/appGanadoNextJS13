'use client'
import React, { useEffect, useState } from "react";
import AnimalService from "../../services/animalService";
import AnimalsList from "../components/AnimalsList";
import { toast } from "react-toastify";

export default function Index() {

    const [listIndex, setListIndex] = useState([])
    const _animalService = new AnimalService()

    useEffect(() => {
        _animalService.index()
            .then((response) => {
                if (!response.ok) {           
                  throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setListIndex(data.listActive)
            }).catch(error => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
            })
    }, [])


    return (
        <>
            <AnimalsList list={listIndex} title="Listado de animales activos" />
        </>
      );
}