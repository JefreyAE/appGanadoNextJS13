'use client'
import React, { useEffect, useState } from "react";
import HerdsList from "../components/HerdsList";
import { ToastContainer } from "react-toastify";
import SpinnerLoading from "../../components/SpinnerLoading";
import 'react-toastify/dist/ReactToastify.css';
import HerdService from "../../../services/herdService";
import ButtonsBar from "../../components/ButtonsBar";

type ButtonsObject = {
    description: string
    url: string
}

export default function Index() {

    const [listIndex, setListIndex] = useState([])
    const _herdService = new HerdService()

    useEffect(() => {
        _herdService.index()
            .then((data) => {
                data && setListIndex(data.listHerds)
            })
    }, [])

    useEffect(() => {
      
    }, [])

    const buttons: ButtonsObject[] = [
        {description: 'Crear nuevo hato', url: "/herds/register"}
    ]

    return (
        <>  
           <ButtonsBar buttons={buttons}/>
            { listIndex.length > 0 ?
                <HerdsList list={listIndex} title="Listado de hatos" />
                :
                <>
                    <SpinnerLoading/>   
                </>
            }   
            <ToastContainer/>        
        </>
      );
}