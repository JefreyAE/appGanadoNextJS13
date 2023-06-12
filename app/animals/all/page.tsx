'use client'
import React, { useState, useEffect } from "react";
import AnimalService from "../../services/animalService";
import AnimalsList from "../components/AnimalsList";

export default function All() {

  const [listAll, setList] = useState([]);
  let _animalService = new AnimalService();

  useEffect(() => {
    _animalService.indexAll()
      .then((res: any) => res.json())
      .then((data: any) => {
        setList(data.listAll);
      })
      .catch((error: any) => {
        console.log(error); // me muestra el contenido de la respuesta con error
      });
  }, []);

  // if (listAll.length >= 1) {
    return (
      listAll && <AnimalsList list={listAll} title={"Listado de todos los animales"}></AnimalsList>
    );
  // } else {
  //   return (
  //     <h1 className="loading">Cargando...</h1>
  //   );
  // }

}

//All.Auth = WithPrivateRoute