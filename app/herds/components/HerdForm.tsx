'use client'
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Herd from "../../../models/herds";
import InputText from "../../components/formComponents/InputText";
import { validateFormInputs } from "../../../helpers/validationsTool";
import { ValidationObject } from "../../../types/types";
interface HerdFormSectionProps{
    getHerdFormData: (fn:() => Herd)=>void
    herdValidationForm: (fn:() => boolean)=>void
    herd?: Herd | undefined
    isFormDisabled?: boolean 
}

const EmptyHerd = new Herd(null,null,null)

export default function HerdForm({ herd=EmptyHerd, getHerdFormData, herdValidationForm, isFormDisabled = false }: HerdFormSectionProps) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        herd.name && setName(herd.name)
        herd.description && setDescription(herd.description)
    },[])
   
    useEffect(() => {
        herd && getHerdFormData(() => {
            return new Herd(herd.id, name , description)
        })

        const inputs:ValidationObject[] = [
            {type: "alfanumerico", name:"name", value:name},
            {type: "alfanumerico", name:"description", value:description},      
        ]
        herdValidationForm(() => validateFormInputs(inputs))
    }, [,name, description])

    return (
        <>
            <InputText title="Nombre" setData={setName} entity={herd} name={'name'} isDisabled={isFormDisabled} isRequired={true} />
            <InputText title="Descripción" setData={setDescription} entity={herd} name={'description'} isDisabled={isFormDisabled} isRequired={true} />  
            <ToastContainer />
        </>
    );
}