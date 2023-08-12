'use client'
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {  OptionObject } from "../../../types/types";
import InputSelect from "../../components/formComponents/InputSelect";
import InputText from "../../components/formComponents/InputText";
import InputDate from "../../components/formComponents/InputDate";
import PostAnimal from "../../../models/postAnimal";

interface PostsAnimalsRegisterProps {
    entity?: PostAnimal
    buttonValue: string
    formFn: (e:any)=>void
    selectedFiles?: File[]
    isOnSale: number | string
    isPublic: number | string
    isOpen: number | string
    setDescription: any
    setPrice: any
    setIsPublic: any
    setIsOnSale: any
    setIsOpen: any
    setExpiration_date: any
    setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}
export default function FormPostsAnimals({ entity, buttonValue, formFn, selectedFiles, isOnSale=0, isPublic=1, isOpen=0, setDescription, setPrice, setIsPublic, setIsOnSale, setIsOpen, setExpiration_date, setSelectedFiles }: PostsAnimalsRegisterProps) {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            selectedFiles && setSelectedFiles((prevFiles:any) => [...prevFiles, ...Array.from(files)]);
        }
    };
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
            <form className="form-data" id="postForm" onSubmit={formFn} encType="multipart/form-data">
                <InputText title="Ingrese una descripción &nbsp;&nbsp;" setData={setDescription} name="description" entity={entity}/>
                <InputSelect title="Tipo de publicación &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" name="isPublic" 
                            setData={setIsPublic} options={isPublicOptions} entity={entity}
                            defaultText={entity && (isPublic === "1" || isPublic === 1) ? "Pública" : "Privada"}/>
                <InputSelect title="Propósito de la publicación" name="isOnSale" 
                            setData={setIsOnSale} options={isOnSaleOptions} entity={entity}
                            defaultText={entity && (isOnSale === "1" || isOnSale === 1) ? "Vender" : "Solo publicar"}/>
                {(isOnSale === "1" || isOnSale === 1) && (<>
                    <InputText title="Monto base  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" 
                                setData={setPrice} name="price" entity={entity}/>
                    <InputSelect title="¿Abierta a recibir ofertas? &nbsp;&nbsp;" name="isOpen" 
                                setData={setIsOpen} options={isOpenOptions} entity={entity} 
                                defaultText={entity && (isOpen === "1" || isOpen === 1) ? "Si" : "No"}/>
                    <InputDate title="Fecha límite para recibir ofertas" name="expiration_date" setData={setExpiration_date} entity={entity}/>
                </>)}
                <div className="mb-2">
                    <label className="form-label" htmlFor="file0">Selecciona las imágenes:</label>
                    <input type="file" className="form-control" name="files[]" id="file0" multiple onChange={handleFileChange} required={false} />
                    {selectedFiles && selectedFiles.map((file, index) => {
                        return (<div key={index}><span className="mt-2" ><strong>{index + 1}:</strong>{file.name}</span><br /></div>)
                    })}
                    <input type="submit" className="btn btn-success btn-lg btn-block mt-3" value={buttonValue} id="btnRegister" />
                </div>
                <div id="cargando" style={{ display: 'none' }}>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-success" role="status"></div>
                        <div className="spinner-border text-danger" role="status"></div>
                        <div className="spinner-border text-warning" role="status"></div>
                    </div>
                    <span className="alert ">Creando publicación...</span>
                </div>
            </form>
        </>
    )
}