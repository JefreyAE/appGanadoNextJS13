'use client'
import React, { useState, useEffect } from "react"
import AnimalService from "../../../services/animalService"
import AnimalsList from "../components/AnimalsList"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import SpinnerLoading from "../../components/SpinnerLoading"
import ButtonsBar from "../../components/ButtonsBar"

type ButtonsObject = {
  description: string
  url: string
}
export default function All() {

  const [listAll, setList] = useState([]);
  let _animalService = new AnimalService();

  useEffect(() => {
    _animalService.indexAll()
      .then((data: any) => {
        data && setList(data.listAll);
      })
  }, []);

  const buttons: ButtonsObject[] = [
      {description: 'Registrar animal', url: "/animals/register"}
  ]

  return (
    <>
      <ButtonsBar buttons={buttons} />
      {listAll.length >= 0 ?
        <AnimalsList list={listAll} title={"Listado de todos los animales"}></AnimalsList>
        :
        <SpinnerLoading />
      }

      <ToastContainer />
    </>
  );


}
