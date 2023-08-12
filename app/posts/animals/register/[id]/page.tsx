'use client'
import PostsAnimalService from "../../../../../services/postsAnimalService";
import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import ButtonsBar from "../../../../components/ButtonsBar";
import { ToastContainer } from "react-toastify";
import { ButtonsObject, OptionObject } from "../../../../../types/types";
import AnimalService from "../../../../../services/animalService";
import Carousel from "../../../../animals/components/Carousel";
import InputSelect from "../../../../components/formComponents/InputSelect";
import InputText from "../../../../components/formComponents/InputText";
import InputDate from "../../../../components/formComponents/InputDate";

interface PostsAnimalsRegisterProps {
    params: any
}
export default function PostsAnimalsRegister({ params }: PostsAnimalsRegisterProps) {

    const [animal_id, setAnimal_id] = useState<number | null>(params.id);
    const [description, setDescription] = useState<string | null>(null);
    const [price, setPrice] = useState<string | null>("000");
    const [isPublic, setIsPublic] = useState<string>("1");
    const [isOnSale, setIsOnSale] = useState<string>("0");
    const [isOpen, setIsOpen] = useState<string>("0");
    const [expiration_date, setExpiration_date] = useState<string | null>('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [listImages, setListImages] = useState();

    const _postAnimalService = new PostsAnimalService();
    const _animalService = new AnimalService();

    useEffect(() => {
        const fetchData = async () => {
            const imagesData = await _animalService.getImages(params.id);
            imagesData && setListImages(imagesData.images_list);
        }
        fetchData();      
    }, [, params.id])

    const createPost = (e: any) => {
        e.preventDefault();
        const cargando = document.getElementById("cargando");
        if (cargando != null) {
            cargando.style.display = 'block';

            const postForm = new FormData();
            animal_id && postForm.append('animal_id', `${animal_id}`);
            postForm.append('price', `${price}`);
            postForm.append('description', `${description}`);
            postForm.append('isPublic', `${isPublic}`);
            postForm.append('isOnSale', `${isOnSale}`);
            postForm.append('isOpen', `${isOpen}`);
            postForm.append('expiration_date', `${expiration_date}`);

            selectedFiles.forEach((file, index) => {
                postForm.append(`files[${index}]`, file);
            });

            if (postForm != null) {
                _postAnimalService.register(postForm)
                    .finally(() => {
                        if (cargando != null) {
                            cargando.style.display = 'none';
                        }
                        setSelectedFiles([])
                    });
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
        }
    };

    const buttons: ButtonsObject[] = [
        { description: 'Registrar animal', url: "/animals/register" },
    ]
    const isPublicOptions: OptionObject[] = [
        { description: 'Pública', value: 1 },
        { description: 'Privada', value: 0 }
    ]
    const isOnSaleOptions: OptionObject[] = [
        { description: 'Vender', value: 1 },
        { description: 'Solo publicar', value: 0 }
    ]
    const isOpenOptions: OptionObject[] = [
        { description: 'Si', value: 1 },
        { description: 'No', value: 0 }
    ]

    return (
        <>
            <ButtonsBar buttons={buttons} />
            <div className="row mt-4 justify-content-center">
                <div className="col-md-4">
                    {listImages && <Carousel resourceUrl="/api/animals/image/" listImages={listImages} />}                 
                </div>
            </div>
            <section className="frontend row justify-content-center">
                <h1 className="titulo col-md-12">Crear publicación</h1>
                <div className="form col-lg-8" >
                    <form className="form-data" id="postForm" onSubmit={createPost} encType="multipart/form-data">
                        <InputText title="Ingrese una descripción &nbsp;&nbsp;" setData={setDescription} name="description" />
                        <InputSelect title="Tipo de publicación &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" name="isPublic" setData={setIsPublic} options={isPublicOptions} />
                        <InputSelect title="Propósito de la publicación" name="isOnSale" setData={setIsOnSale} options={isOnSaleOptions} />
                        {isOnSale === '1' && (<>
                            <InputText title="Monto base &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" setData={setPrice} name="price" />
                            <InputSelect title="Abierta a recibir ofertas?" name="isOpen" setData={setIsOpen} options={isOpenOptions} />
                            <InputDate title="Fecha límite para recibir ofertas" name="expiration_date" setData={setExpiration_date}/>
                        </>)}
                        <div className="mb-2">
                            <label className="form-label" htmlFor="file0">Selecciona las imágenes:</label>
                            <input type="file" className="form-control" name="files[]" id="file0" multiple onChange={handleFileChange} required />
                            {selectedFiles && selectedFiles.map((file, index) => {
                                return (<div key={index}><span className="mt-2" ><strong>{index + 1}:</strong>{file.name}</span><br /></div>)
                            })}
                            <input type="submit" className="btn btn-success btn-lg btn-block mt-3" value="Publicar" id="btnRegister" />
                        </div>
                        <div id="cargando" style={{ display: 'none' }}>
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-success" role="status"></div>
                                <div className="spinner-border text-danger" role="status"></div>
                                <div className="spinner-border text-warning" role="status"></div>
                            </div>
                            <span className="alert ">Subiendo imagen...</span>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}