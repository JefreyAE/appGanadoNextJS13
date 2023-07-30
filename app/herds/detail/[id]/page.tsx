'use client'
import { useEffect, useState } from "react";
import HerdService from "../../../../services/herdService";
import React from "react";
import Herd from "../../../../models/herds";
import Animal from "../../../../models/animal";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import HerdForm from "../../components/HerdForm";
import AnimalsList from "../../../animals/components/AnimalsList";
import SpinnerLoading from "../../../components/SpinnerLoading";
import UpdateSection from "../../../components/formComponents/UpdateSection";
import ButtonsBar from "../../../components/ButtonsBar";
import { ButtonsObject } from "../../../../types/types";

interface DetailProps {
    params: any
}
export default function AnimalPageDetail({ params }: DetailProps) {

    const [herd, setHerd] = useState<Herd>();
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [isValidHerdForm, setIsValidHerdForm] = useState(true)
    const router = useRouter()
    const [isDisabled, setIsDisabled] = useState(true);

    const _herdService = new HerdService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { herd, animalsList } = await _herdService.detail(params.id)
                setHerd(herd)
                setAnimals(animalsList)
            } catch (error: any) {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            }
        }
        fetchData();
    }, [params.id]);

    const update = (e: any) => {
        e.preventDefault();
        if (isValidHerdForm) {
            herd && _herdService.update(herd);
        } else {
            toast.error("Debes corregir los datos", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    }

    const deleteHerd = (e: any) => {
        e.preventDefault()
        herd && herd.id && _herdService.delete(herd.id)
            .then((data) => {
                if(data.status === 'success') router.push('/herds/index');
            })
    }

    const getHerdFormData = (callback: () => Herd) => {
        setHerd(callback());
    }

    const herdValidationForm = (callback: ()=>boolean) => {
        setIsValidHerdForm(callback())
    }

    const enableInputs = () =>{
        setIsDisabled(false);
    }

    const buttons: ButtonsObject[] = [
        {description: 'Crear nuevo hato', url: "/herds/register"}
    ]

    return (
        <>  
            <ButtonsBar buttons={buttons} />
            {herd && <section className="frontend row justify-content-center">
                    <h1 className="titulo col-md-12">Detalles del hato</h1>
                    <div className="form col-lg-8" id='formDetailAnimal'>
                        <h2 className="titulo-2">Información general</h2>
                        <form id="form-detail-update" onSubmit={update} className="form_data form-group row">
                            <HerdForm
                                herd={herd}
                                getHerdFormData={getHerdFormData}
                                isFormDisabled={isDisabled}
                                herdValidationForm={herdValidationForm}
                            />
                            <UpdateSection enableInputs={enableInputs} delete_function={deleteHerd}/>
                        </form>
                    </div>
                </section>
            }
            {animals && animals.length >= 0 ? (
                <AnimalsList list={animals} title={"Animales del hato"} />
            ) : (
                <SpinnerLoading />
            )}
        </>
    );
}