'use client'
import AnimalService from "../../../services/animalService";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import InputText from "../../components/formComponents/InputText";
import InputSelect from "../../components/formComponents/InputSelect";
import Validations from "../../../helpers/validations";
import AnimalsList from "../components/AnimalsList";
import { OptionObject } from "../../../types/types";

export default function Register() {

    const _animalService = new AnimalService();
    let validate = new Validations();
    
    const [search_type, setSearch_Type] = useState("");
    const [find_string, setFind_string] = useState("");
    const [animalsList, setAnimalsList] = useState<[] | undefined>();

    const searchOptions:OptionObject[] = [
        {"value":"code", "description":"Por código"},
        {"value":"nickname", "description":"Por nombre"},
        {"value":"certification_name", "description":"Por nombre de certificación"},
        {"value":"registration_number", "description":"Por número de registro"},
    ]

    useEffect(()=>{
        validate.validarAlfaNumerico("find_string", find_string || "")
    },[find_string])

    const search = (e:any) => {
        e.preventDefault();
        if (validate.validarAlfaNumerico("find_string", find_string || "")) {
            _animalService.find(search_type, find_string)
            .then(data => setAnimalsList(data.listFind));
        }else{
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    return (
        <>
            <section className="frontend row justify-content-center">
                <h1 className="titulo col-md-12">Búsqueda de animales</h1>
                <div className="form col-lg-8" id='formDetailAnimal'>
                    <form id="form-detail-update" onSubmit={search} className="form_data form-group row">
                        <InputSelect title="Seleccione el tipo de búsqueda:" setData={setSearch_Type} name={'search_type'} options={searchOptions} isDisabled={false} />
                        <InputText title="Ingrese la búsqueda" setData={setFind_string} name={'find_string'} isDisabled={false} />
                        <input type="submit" className="btn btn-success btn-lg btn-block" value="Buscar" id="btnSearch" />
                    </form>
                    <ToastContainer />
                </div>
            </section>
            {animalsList && animalsList.length > 0 ? <AnimalsList list={animalsList} title={"Resultados de la búsqueda"} /> : animalsList && <h1 className="titulo col-md-12">No se encontraron resultados</h1>} 
        </>
    );

}