'use client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Animal from "../../../models/animal";
import AnimalService from "../../../services/animalService";
import { useEffect, useState } from "react";
import InputTextArea from "../../components/formComponents/InputTextArea";
import InputSelect from "../../components/formComponents/InputSelect";
import InputDate from "../../components/formComponents/InputDate";
import Validations from "../../../helpers/validations";
import Incident from "../../../models/incident";
import IncidentsService from "../../../services/incidentsService";
import ButtonsBar from "../../components/ButtonsBar";

type OptionObject = {
    value: string | null | number
    description: string | null
}
export default function Register() {

    const _animalService = new AnimalService()
    const _incidentService = new IncidentsService()

    const validate = new Validations();

    const [description, setDescription] = useState('')
    const [incident_type, setIncident_type] = useState('')
    const [incident_date, setIncident_date] = useState('')
    const [animal_id, setAnimal_id] = useState(null)
    const [animalDataOptions, setAnimalDataOptions] = useState<OptionObject[]>()

    useEffect(()=>{
        _animalService.index()
            .then((data) => {
                data && generateAnimalsDataOptions(data.listActive)
            })
    },[])

    useEffect(()=>{
        validate.validarAlfaNumericoTextarea('description', description)  
    },[description])

    const register = async (e:any) => {
        e.preventDefault();
        if (validate.validarAlfaNumericoTextarea('description', description)) {       
            const incident = new Incident(null, animal_id, incident_date, incident_type, description, null, null, null)     
            _incidentService.register(incident)   
        }else{
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    const incidentTypeOptions:string[] = [
        "Aborto",
        "Herida abierta",
        "Muerte",
        "Infección",
        "RenqueraVivo",
        "Rechazado por la madre",
        "Muerte de la madre",
        "Gabarros",
        "Tórsalos",
        "Otro"
      ];

    const generateAnimalsDataOptions = (animals:Animal[])=>{
        let options:any[] = []
        animals.map((animal, key)=>{
            options.push({"value":animal.id, "description":`${animal.certification_name} ${animal.nickname}`})
        })
        options && setAnimalDataOptions(options)
    }

    return (
        <>
            <ButtonsBar />
            <section className="frontend row justify-content-center">
            <h1 className="titulo col-md-12">Ingrese los datos del incidente</h1>
            <div className="form col-lg-8" id='formDetailAnimal'>
                <form id="form-detail-update" onSubmit={register} className="form_data form-group row">
                    <InputSelect name="animal_id" title="Seleccione el animal" options={animalDataOptions || []} setData={setAnimal_id} />
                    <InputDate name="incident_date" title="Fecha del incidente" setData={setIncident_date} isRequired={true} />
                    <InputSelect name="incident_type" title="Tipo de incidente" options={incidentTypeOptions} setData={setIncident_type} />
                    <InputTextArea name="description" title="Descripción del incidente" setData={setDescription}/>
                    <input type="submit" className="btn btn-success btn-lg btn-block" value="Registrar" id="btnRegister" />
                </form>
                <ToastContainer />
            </div>
        </section>
        </>
    );
}