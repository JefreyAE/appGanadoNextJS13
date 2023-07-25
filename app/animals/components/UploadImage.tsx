'use client'
import AnimalService from "../../../services/animalService";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';

export default function UploadImage(props: any) {

    let _animalService = new AnimalService();

    let uploadImageSub = (e: any) => {
        e.preventDefault();
        var uploadImagex = document.getElementById('uploadImage') as HTMLFormElement;;

        var cargando = document.getElementById("cargando");
        if (cargando != null) {
            cargando.style.display = 'block';

            if (uploadImagex != null) {
                let dt = new FormData(uploadImagex);           
                _animalService.uploadImage(dt)
                    .finally(() => {
                        if (cargando != null) {
                            cargando.style.display = 'none';
                        }
                        props.imageUploaded();
                    });             
            }
        }
    }

    let showUploadForm = (e: any) => {
        let colapse = document.getElementById('collapseOne');
        colapse ? colapse.style.display === 'block' ? colapse.style.display = 'none' : colapse.style.display = 'block' : '';
    }

    return (
        <React.Fragment>
            <div className="accordion" id="accordionExample">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-left" onClick={e => showUploadForm(e)} formMethod="POST" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Agregar una nueva imagen
                            </button>
                        </h2>
                    </div>
                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body">
                            <form className="form-data" id="uploadImage" onSubmit={uploadImageSub} encType="multipart/form-data">
                                <div className="mb-2">
                                    <label className="form-label" htmlFor="title">Titulo:</label>
                                    <input type="text" className="form-control" name="title" id="title" pattern="[A-Za-z0-9\s/-]+" title="No se adminten caracteres especiales" required />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label" htmlFor="description">Descripción:</label>
                                    <textarea className="form-control" name="description" id="description" title="No se adminten caracteres especiales"></textarea>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label" htmlFor="file0">Selecciona una imagen:</label>
                                    <input type="file" className="form-control" name="file0" id="file0" required />
                                    <input type="hidden" name="animal_id" id="animal_id" value={props.animal_id || ''} />
                                    <input className="btn btn-success" type="submit" value="Subir imagen" />
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
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}