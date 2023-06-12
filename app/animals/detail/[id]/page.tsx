'use client'
import { useEffect, useState } from "react";
import AnimalService from "../../../services/animalService";
import React from "react";
import Carousel from "../../components/Carousel";
import UploadImage from "../../components/UploadImage";
import AnimalDetail from "../../components/AnimalDetail";
import Animal from "../../../models/animal";
import Acordion from "../../components/Acordion";
import StatisticTable from "../../components/StatisticTable";
import InjectablesTable from "../../../injectables/components/InjectablesTable";
import IncidentsTable from "../../../incidents/page";
import OffSpringsTable from "../../components/OffSpringsTable";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DetailProps {
    params: any
}
export default function Detail({ params }: DetailProps) {

    const [listImages, setListImages] = useState([]);
    const [animal, setAnimal] = useState<Animal>({} as Animal);
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [statistics, setStatistics] = useState({});
    const [incidents, setIncidents] = useState([]);
    const [injectables, setInjectables] = useState([]);
    const [offsprings, setOffsprings] = useState([]);

    let _animalService = new AnimalService();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const imageResponse = await _animalService.getImages(params.id);
                if (!imageResponse.ok) {
                    throw new Error(imageResponse.statusText)
                }
                const imagesData = await imageResponse.json();
                setListImages(imagesData.images_list);
            } catch (error: any) {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
            }

            try {
                const detailResponse = await _animalService.detail(params.id)
                if (!detailResponse.ok) {
                    throw new Error(detailResponse.statusText)
                }
                const detailData = await detailResponse.json();
                const { detail, statistics, incidents, injectables, offsprings } = detailData;
                setAnimal(detail[0]);
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

            try {
                const indexResponse = await _animalService.index();
                if (!indexResponse.ok) {
                    throw new Error(indexResponse.statusText);
                }
                const indexData = await indexResponse.json();
                setAnimals(indexData.listActive);
            } catch (error: any) {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
            }
        }
        fetchData();
    }, [params.id]);

    return (
        <>
            <div className="row mt-4 justify-content-center">
                <div className="col-md-7">
                    {listImages.length >= 1 &&
                        <Carousel imagesList={listImages} />
                    }
                    {listImages.length >= 0 && params.id &&
                        <UploadImage animal_id={params.id} />
                    }
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
                    <InjectablesTable animal={animal} injectables={injectables} />
                </Acordion>
            }
            {incidents && incidents.length > 0 &&
                <Acordion title="Mostrar incidentes registrados" id={3}>
                    <IncidentsTable animal={animal} incidents={incidents} />
                </Acordion>
            }
            {offsprings && offsprings.length > 0 &&
                <Acordion title="Mostrar descendencia" id={4}>
                    <OffSpringsTable animal={animal} offSprings={offsprings} />
                </Acordion>
            }
            <ToastContainer />
        </>
    );

}