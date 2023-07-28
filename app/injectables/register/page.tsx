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
import Injectable from "../../../models/injectable";
import InjectableService from "../../../services/injectableService";
import InputText from "../../components/formComponents/InputText";
import HerdService from "../../../services/herdService";
import Herd from "../../../models/herds";
import ButtonsBar from "../../components/ButtonsBar";

type OptionObject = {
    value: string | null | number
    description: string | null
}
export default function Register() {

    const _animalService = new AnimalService()
    const _injectableService = new InjectableService()
    const _herdService = new HerdService()

    const validate = new Validations();

    const [description, setDescription] = useState('')
    const [injectable_type, setInjectable_type] = useState('')
    const [injectable_name, setInjectable_name] = useState('')
    const [application_date, setApplication_date] = useState('')
    const [injectable_brand, setInjectable_brand] = useState('')
    const [withdrawal_time, setWithdrawal_time] = useState(null)
    const [effective_time, setEffective_time] = useState(null)
    const [animal_id, setAnimal_id] = useState(null)
    const [animalDataOptions, setAnimalDataOptions] = useState<OptionObject[]>()
    const [listHerds, setListHerds] = useState([])
    const [listAnimals, setListAnimals] = useState([])

    useEffect(() => {
        _animalService.index()
            .then((data) => {
                setListAnimals(data.listActive)
            })
        _herdService.index()
            .then((data) => {
                data && setListHerds(data.listHerds)
            })
    }, [])

    useEffect(() => {
        generateAnimalsDataOptions(listAnimals, listHerds)
    }, [listHerds, listAnimals])


    const register = async (e: any) => {
        e.preventDefault();
        if (validate.validarAlfaNumerico(description) && validate.validarAlfaNumerico(injectable_name) && validate.validarAlfaNumerico(injectable_brand)) {
            const injectable = new Injectable(null, animal_id, injectable_type, application_date, injectable_name, injectable_brand, withdrawal_time, effective_time, description, null, null, null, null)
            _injectableService.register(injectable)
        } else {
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    const injectableTypeOptions: string[] = [
        'Antibiotico', 'Desparasitante', 'Vitaminas', 'Vacuna', 'Inmuno Estimulante', 'Hormonas', 'Otro'
    ];
    const periodOptions: OptionObject[] = [
        { value: 8, description: '8' },
        { value: 15, description: '15 días' },
        { value: 22, description: '22 días' },
        { value: 30, description: '30 días - 1 mes' },
        { value: 60, description: '60 días - 2 mes' },
        { value: 90, description: '90 días - 3 mes' },
        { value: 120, description: '120 días - 4 mes' },
        { value: 150, description: '150 días - 5 mes' },
        { value: 180, description: '180 días - 6 mes' },
        { value: 365, description: '365 días - 1 año' }
    ]


    const generateAnimalsDataOptions = (animals: Animal[], herds: Herd[]) => {
        let options: any[] = []
        options.push({ "value": "all", "description": "Aplicar a todos" })
        herds.map((herd, key) => {
            options.push({ "value": `Hato-${herd.id}`, "description": `Hato-${herd.name}` })
        })
        animals.map((animal, key) => {
            options.push({ "value": animal.id, "description": `${animal.certification_name} ${animal.nickname}` })
        })
        options && setAnimalDataOptions(options)
    }

    return (
        <>
            <ButtonsBar />
            <section className="frontend row justify-content-center">
                <h1 className="titulo col-md-12">Ingrese los datos del inyectable aplicado</h1>
                <div className="form col-lg-8" id='formDetailAnimal'>
                    <form id="form-detail-update" onSubmit={register} className="form_data form-group row">
                        <InputSelect name="animal_id" title="Seleccione el animal" options={animalDataOptions || []} setData={setAnimal_id} />
                        <InputSelect name="injectable_type" title="Tipo de inyectable" options={injectableTypeOptions} setData={setInjectable_type} />
                        <InputDate name="application_date" title="Fecha de aplicación" setData={setApplication_date} isRequired={true}/>
                        <InputText name="injectable_name" title="Nombre del inyectable" setData={setInjectable_name} />
                        <InputText name="injectable_brand" title="Marca del inyectable" setData={setInjectable_brand} />
                        <InputSelect name="withdrawal_time" title="Periodo de retiro" options={periodOptions} setData={setWithdrawal_time} />
                        <InputSelect name="effective_time" title="Periodo de efectividad" options={periodOptions} setData={setEffective_time} />
                        <InputTextArea name="description" title="Descripción del inyectable" setData={setDescription} />
                        <input type="submit" className="btn btn-success btn-lg btn-block" value="Registrar" id="btnRegister" />
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    );
}