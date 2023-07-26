'use client'
import { useEffect, useState } from "react";
import AnimalService from "../../../../services/animalService";
import React from "react";
import Carousel from "../../components/Carousel";
import UploadImage from "../../components/UploadImage";
import AnimalDetail from "../../components/AnimalDetail";
import Animal from "../../../../models/animal";
import Acordion from "../../components/Acordion";
import StatisticTable from "../../components/StatisticTable";
import InjectablesList from "../../../injectables/components/InjectablesList";
import IncidentsList from "../../../incidents/components/IncidentsList";
import OffSpringsTable from "../../components/OffSpringsTable";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ButtonsBar from "../../../components/ButtonsBar";

interface DetailProps {
    params: any
}
export default function AnimalPageDetail({ params }: DetailProps) {

    const [animal, setAnimal] = useState<Animal>({} as Animal);
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [statistics, setStatistics] = useState({});
    const [incidents, setIncidents] = useState([]);
    const [injectables, setInjectables] = useState([]);
    const [offsprings, setOffsprings] = useState([]);
    const [imagesUpdate, setImagesUpdated] = useState(true);

    const [listImages, setListImages] = useState();

    let _animalService = new AnimalService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detailData = await _animalService.detail(params.id)
                const { detail, statistics, incidents, injectables, offsprings } = detailData;
                setAnimal(detail);
                setStatistics(statistics);
                setIncidents(incidents);
                setInjectables(injectables);
                setOffsprings(offsprings);
            } catch (error: any) {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
            }

            const indexData = await _animalService.index();
            indexData && setAnimals(indexData.listActive);
        }
        fetchData();
    }, [params.id]);

    useEffect(() => {
        const fetchData = async () => {
            const imagesData = await _animalService.getImages(params.id);
            imagesData && setListImages(imagesData.images_list);
        }
        fetchData();      
    }, [, imagesUpdate, params.id])


    const imageUploaded = ()=>{
        setImagesUpdated(imagesUpdate ? false : true)
    }

    const delete_image = (image_name: string, animal_id: number, user_id:number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta imagen?");

        if (confirmDelete) {
            _animalService.deleteImage(image_name, animal_id, user_id)
                .finally(() => {
                    setImagesUpdated(imagesUpdate ? false : true)
                })
        }
    }

    return (
        <>
            <ButtonsBar />
            <div className="row mt-4 justify-content-center">
                <div className="col-md-7">
                    {listImages && <Carousel listImages={listImages} delete_image={delete_image}/>}     
                    <UploadImage animal_id={params.id} imageUploaded={imageUploaded}/>                  
                </div>
            </div>
            <>
                {animal && animals.length > 0 ? (
                    <AnimalDetail animal={animal} animals={animals} />
                ) : (
                    <></>
                )}
            </>

            {statistics &&
                <Acordion title="Mostrar estadísticas" id={1}>
                    <StatisticTable statistics={statistics} />
                </Acordion>
            }
            {injectables && injectables.length > 0 &&
                <Acordion title="Mostrar inyectables aplicados" id={2}>
                    <InjectablesList injectables={injectables} />
                </Acordion>
            }
            {incidents && incidents.length > 0 &&
                <Acordion title="Mostrar incidentes registrados" id={3}>
                    <IncidentsList incidents={incidents} />
                </Acordion>
            }
            {offsprings && offsprings.length > 0 &&
                <Acordion title="Mostrar descendencia" id={4}>
                    <OffSpringsTable animal={animal} offSprings={offsprings} />
                </Acordion>
            }
        </>
    );

}