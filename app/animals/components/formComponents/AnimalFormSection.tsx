'use client'
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Animal from "../../../../models/animal";
import SelectParents from "./AnimalSelectParents";
import InputText from "../../../components/formComponents/InputText";
import InputDate from "../../../components/formComponents/InputDate";
import InputSelect from "../../../components/formComponents/InputSelect";
import UpdateSection from "../../../components/formComponents/UpdateSection";
import { validateFormInputs } from "../../../../helpers/validationsTool";
import SelectHerd from './AnimalSelectHerd'
import HerdService from "../../../../services/herdService";

type ValidationObject = {
    type: string
    name: string;
    value: any
}

interface AnimalFormSectionProps{
    getAnimalFormData: (fn:() => Animal)=>void
    animalValidationForm: (fn:()=>boolean)=>void
    animals?: Animal[]
    animal?: Animal | undefined
    action:string 
    isFormDisabled?: boolean
    deleteAnimal?: (e:any)=>void
}

const EmptyAnimal = new Animal(0,null,null,null,null,null,null,null,0,0,"",null,null,null,null)

export default function AnimalFormSection({ animal=EmptyAnimal, animals, getAnimalFormData, animalValidationForm, action, isFormDisabled = false, deleteAnimal }: AnimalFormSectionProps) {

    const [nickname, setNickname] = useState(animal['nickname'] || '');
    const [certification_name, setCertification_name] = useState(animal['certification_name'] || '');
    const [registration_number, setRegistration_number] = useState(animal['registration_number'] || '');
    const [code, setCode] = useState(animal['code'] || '');
    const [birth_weight, setBirth_weight] = useState(animal['birth_weight'] || 0);
    const [birth_date, setBirth_date] = useState(animal['birth_date']);
    const [sex, setSex] = useState(animal['sex']);
    const [father_id, setFather_id] = useState(animal['father_id']);
    const [mother_id, setMother_id] = useState(animal['mother_id']);
    const [herd_id, setHerd_id] = useState(animal['herd_id']);
    const [race, setRace] = useState(animal['race']);
    const [isDisabled, setIsDisabled] = useState(isFormDisabled);
    const [herds, setHerds] = useState([])

    const _herdService = new HerdService()

    const animalOptions = ["Macho", "Hembra"]
    const raceOptions = [
        "Brahaman",
        "Simbra",
        "Angus",
        "Simmental",
        "Holstein",
        "Nelore",
        "Jersey",
        "Pardo Suizo",
        "Charolais",
        "Brandford"
    ];

    useEffect(()=>{
        _herdService.index()
        .then((data) => {
            data && setHerds(data.listHerds)  
        })
    },[])

    const enableInputs = () =>{
        setIsDisabled(false);
    }

    useEffect(() => {
        getAnimalFormData(() => {     
            return new Animal(animal.id, nickname , certification_name, registration_number, code, birth_weight, birth_date, sex, father_id ? father_id : "unknown", mother_id ? mother_id : "unknown", race, null,null,null,herd_id)
        })

        const inputs:ValidationObject[] = [
            {type: "alfanumerico", name:"nickname", value:nickname},
            {type: "alfanumerico", name:"certification_name", value:certification_name},    
            {type: "alfanumerico", name:"registration_number", value:registration_number},
            {type: "numerico", name:"birth_weight", value:birth_weight},    
            {type: "alfanumerico", name:"code", value:code},        
        ]
        animalValidationForm(() => validateFormInputs(inputs))

    }, [nickname, certification_name, registration_number, code, birth_date, birth_weight, sex, father_id, mother_id, race, herd_id])

    return (
        <>
            <InputText title="Nombre" setData={setNickname} entity={animal} name={'nickname'} isDisabled={isDisabled} isRequired={true} />
            <InputText title="Nombre de certificación" setData={setCertification_name} entity={animal} name={'certification_name'} isDisabled={isDisabled} />
            <InputText title="Número de registro" setData={setRegistration_number} entity={animal} name={'registration_number'} isDisabled={isDisabled} />
            <InputText title="Peso de nacimiento" setData={setBirth_weight} entity={animal} name={'birth_weight'} isDisabled={isDisabled} />
            <InputText title="Código de registro" setData={setCode} entity={animal} name={'code'} isDisabled={isDisabled} />
            <SelectHerd title="Seleccione el hato" setData={setHerd_id} animal={animal} isDisabled={isDisabled} herds={herds} />
            <InputSelect title="Sexo del animal" setData={setSex} entity={animal} name={'sex'} options={animalOptions} isDisabled={isDisabled} />
            <InputDate title="Fecha de nacimiento" setData={setBirth_date} entity={animal} name={'birth_date'} isDisabled={isDisabled} />
            <InputSelect title="Raza del animal" setData={setRace} entity={animal} name={'race'} options={raceOptions} isDisabled={isDisabled} />
            {(action === 'register' || action === 'update') &&
                <>
                    {animals && <SelectParents animal={animal} animals={animals} setParentId={setFather_id} parent="father" isDisabled={isDisabled}/>}
                    {animals && <SelectParents animal={animal} animals={animals} setParentId={setMother_id} parent="mother" isDisabled={isDisabled} />}
                </>
            }
            {action === 'update' &&
                <>
                    <InputText title="Estado del animal" setData={() => { }} entity={animal} name={'animal_state'} isDisabled={isDisabled} />
                    <UpdateSection enableInputs={enableInputs} delete_function={deleteAnimal}/>
                </>
            }

            <ToastContainer />
        </>
    );
}