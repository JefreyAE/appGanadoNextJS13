'use client'
import { useEffect, useState } from "react";
import InjectablesService from "../../../../services/injectableService";
import React from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import InjectableInfo from "../../components/InjectableInfo";
import AnimalsList from "../../../animals/components/AnimalsList";

interface DetailProps {
    params: any
}
export default function AnimalPageDetail({ params }: DetailProps) {

    const [injectablesAnimalList, setInjectableAnimalList] = useState([]);
    const [injectableInfo, setInjectableInfo] = useState();

    let _injectableService = new InjectablesService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const injectableData = await _injectableService.detail(params.creation_time)
                setInjectableAnimalList(injectableData.listInjectables)
                setInjectableInfo(injectableData.injectable)               
            } catch (error: any) {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
            }           
        }
        fetchData();
    }, [params.creation_time]);

    return (
        <>     
            <InjectableInfo injectable={injectableInfo && injectableInfo}/>      
            <AnimalsList title="Animales tratados" list={injectablesAnimalList} />
        </>
    );

}