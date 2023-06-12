import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

import AnimalService from "../../../services/animalService";
import { Link } from "react-router-dom";
import AnimalCarousel from "../animalCarousel/animalCarousel";
import AnimalUploadImage from "../animalUploadImage/animalUploadImage";
import AnimalDetailForm from "../animalDetailForm/animalDetailForm";

const AnimalDetail = () => {

    const params = useParams();
    const [listDetails, setListDetails] = useState();
    const [listAll, setListAll] = useState([]);
    const [listImages, setListImages] = useState([]);
    const [animal_id, setAnimalId] = useState();
    const [animal, setAnimal] = useState('');
    const [animals, setAnimals] = useState('');

    let _animalService = new AnimalService();

    useEffect(()=>{

        setAnimalId(params.id);

        _animalService.getImages(params.id).then((res)=>{
            setListImages(res.data.images_list);
        }).catch((err)=>{

        });

        _animalService.detail(params.id).then((res)=>{
            //setListDetails(res.data);
            //console.log(res.data.detail[0]);
            setAnimal(res.data.detail[0]);
        }).catch((err)=>{

        });

        _animalService.index().then((res) => {
           // console.log(res.data.listActive);
            // listActive = res.data.listActive;
            setAnimals(res.data.listActive);
        })
        .catch((error) => {
            console.log(error.response.data); // me muestra el contenido de la respuesta con error
        });

      

    },[]);

    return(
        <React.Fragment>
            <div className="row mt-4 justify-content-center">
                <div className="col-md-7">
                    {listImages.length >= 1 &&
                        <AnimalCarousel imagesList={listImages}/>
                    }
                    {listImages.length >= 0 &&
                        <AnimalUploadImage animal_id={animal_id}/>
                    }
                </div>
            </div>  
            
            <AnimalDetailForm animal={animal || []} animals={animals || []}></AnimalDetailForm>
            
        </React.Fragment>
    );
    
}

export default AnimalDetail;