'use client'
import Constants from "../../helpers/constants";
import Validations from "../../helpers/validations"
import { useEffect, useState } from "react";
import React from "react";
import Animal from "../../models/animal";
import AnimalService from "../../services/animalService";

export default function DetailForm(props) {

    let error = 0;

    let constants = new Constants();
    let url = constants.getUrlApi();
    let validate = new Validations();

    let _animalService = new AnimalService();

    const { animal, animals } = props;

    const [sex, setSex] = useState("");
    const [race, setRace] = useState("");

    const [isValidNickname, setisValidNickname] = useState(true);
    const [isValidCertification_name, setisValidCertification_name] = useState(true);
    const [isValidRegistration_number, setisValidRegistration_number] = useState(true);
    const [isValidCode, setisValidCode] = useState(true);
    const [idValidBirth_weight, setidValidBirth_weight] = useState(true);

    let nicknameRef = React.createRef();
    let certification_nameRef = React.createRef();
    let registration_numberRef = React.createRef();
    let codeRef = React.createRef();
    let birth_weightRef = React.createRef();
    let birth_dateRef = React.createRef();
    let sexRef = React.createRef();
    let father_idRef = React.createRef();
    let mother_idRef = React.createRef();
    let raceRef = React.createRef();

    useEffect(() => {
        if (mother_idRef.current) {
            mother_idRef.current.value = props.animal.mother_id;
        }
        if (father_idRef.current) {
            father_idRef.current.value = props.animal.father_id;
        }
    },[animal, animals]);


    let enableForm = (e) => {

        var btnEnableForm = document.querySelector('#btnEnableForm');
        var btnUpdateAnimal = document.querySelector('#btnUpdateAnimal');
        var btnDeleteAnimal = document.querySelector('#btnDeleteAnimal');

        btnUpdateAnimal.style.display = "none";
        btnDeleteAnimal.style.display = "none";

        e.preventDefault();
        var inputNickname = document.getElementById('nickname');
        var inputCertification_name = document.getElementById('certification_name');
        var inputRegistration_number = document.getElementById('registration_number');
        var inputCode = document.getElementById('code');
        var selectPeso = document.querySelector('#birth_weight');
        var birth_date = document.querySelector('#birth_date');
        var sex = document.querySelector('#sex');
        var father_id = document.querySelector('#father_id');
        var mother_id = document.querySelector('#mother_id');
        var race = document.querySelector('#race');

        inputNickname.disabled = false;
        inputCertification_name.disabled = false;
        selectPeso.disabled = false;
        birth_date.disabled = false;
        sex.disabled = false;
        father_id.disabled = false;
        mother_id.disabled = false;
        race.disabled = false;
        inputRegistration_number.disabled = false;
        inputCode.disabled = false;

        btnEnableForm.style.display = "none";
        btnUpdateAnimal.style.display = "inline";
        btnDeleteAnimal.style.display = "block";
    }

    function fecha(f) {
        if (f !== undefined) {
            var sp = f.split(' ');
            return sp[0];
        } else {
            return "";
        }
    }

    let action = (e) => {
        if (isValidNickname && idValidBirth_weight && isValidCertification_name && isValidCode && isValidRegistration_number) {
            e.preventDefault();
            let animalObject = new Animal(animal.id, nicknameRef.current.value, certification_nameRef.current.value, registration_numberRef.current.value, codeRef.current.value, birth_weightRef.current.value, birth_dateRef.current.value, sexRef.current.value, father_idRef.current.value, mother_idRef.current.value, raceRef.current.value)
            props.propFunction(animalObject)
        } else {
            e.preventDefault();
            alert("Debes corregir los datos");
        }
    }

    let delete_animal = (e) => {
        _animalService.delete(animal.id)
        .then(response => response.json())
        .then(data => {
            window.location.href = '/animals/index';
        }).catch(error => {
            console.log(error);           
        })
    }

    return (
        <>
            <form id="form-detail-update" onSubmit={action} className="form_data form-group row">
                <div className="input-group input-group-sm mb-2">
                    <div className="input-group-prepend input-detail-update">
                        <span className="input-group-text">Apodo</span>
                    </div>
                    <input className="form-control" ref={nicknameRef} onChange={(e) => setisValidNickname(validate.validarAlfaNumerico("nickname", nicknameRef))} id="nickname" name='nickname' defaultValue={animal['nickname'] || ""}
                        type="text" disabled={props.propAction === 'update' ? true : false} />
                </div>
                <div className="input-group input-group-sm mb-2">
                    <div className="input-group-prepend input-detail-update">
                        <span className="input-group-text">Nombre de certificación</span>
                    </div>
                    <input className="form-control" id="certification_name" name="certification_name" type="text"
                        defaultValue={animal['certification_name'] || ""} onChange={(e) => setisValidCertification_name(validate.validarAlfaNumerico("certification_name", certification_nameRef))} ref={certification_nameRef} disabled={props.propAction === 'update' ? true : false} />
                </div>
                <div className="input-group input-group-sm mb-2">
                    <div className="input-group-prepend input-detail-update">
                        <span className="input-group-text">Número de registro</span>
                    </div>
                    <input className="form-control" id="registration_number" name="registration_number" type="text"
                        defaultValue={animal['registration_number'] || ""} onChange={(e) => setisValidRegistration_number(validate.validarAlfaNumerico("registration_number", registration_numberRef))} ref={registration_numberRef} disabled={props.propAction === 'update' ? true : false} />
                </div>
                <div className="input-group input-group-sm mb-2">
                    <div className="input-group-prepend input-detail-update">
                        <span className="input-group-text">Peso de nacimiento</span>
                    </div>
                    <input type="text" className="form-control" onChange={(e) => setidValidBirth_weight(validate.validarNumerico("birth_weight", birth_weightRef))} ref={birth_weightRef} name="birth_weight" id="birth_weight"
                        defaultValue={animal['birth_weight'] || ""} disabled={props.propAction === 'update' ? true : false} />
                </div>
                <div className="input-group input-group-sm mb-2">
                    <div className="input-group-prepend input-detail-update">
                        <span className="input-group-text">Código de registro</span>
                    </div>
                    <input className="form-control" ref={codeRef} onChange={(e) => setisValidCode(validate.validarAlfaNumerico("code", codeRef))} id="code" name="code" type="text" defaultValue={animal['code'] || ""} disabled={props.propAction === 'update' ? true : false} />
                </div>
                <div className="input-group input-group-sm mb-2">
                    <div className="input-group-prepend input-detail-update">
                        <span className="input-group-text">Fecha de nacimiento</span>
                    </div>
                    <input className="form-control" ref={birth_dateRef} id="birth_date" name="birth_date" type="date"
                        defaultValue={fecha(animal['birth_date']) || ""} disabled={props.propAction === 'update' ? true : false} />
                </div>
                <div className="input-group input-group-sm mb-2">
                    <div className="input-group-prepend input-detail-update">
                        <span className="input-group-text">Sexo del animal</span>
                    </div>
                    <select className="form-control" id="sex" ref={sexRef} name="sex" defaultValue={animal.sex || ""} required disabled={props.propAction === 'update' ? true : false}>
                        <option value={animal['sex'] || ""} >{animal['sex']}</option>
                        <option value="Macho">Macho</option>
                        <option value="Hembra">Hembra</option>
                    </select>
                </div>
                <div className="input-group input-group-sm mb-2">
                    <div className="input-group-prepend input-detail-update">
                        <span className="input-group-text">Nombre del padre</span>
                    </div>
                    <select className="custom-select" ref={father_idRef} id="father_id" defaultValue={animal.father_id || "Desconocido"} name="father_id" required disabled={props.propAction === 'update' ? true : false}>
                        <option value="unknown" >Desconocido</option>                     
                        { animals && animals.map((animalP, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {animalP['sex'] == 'Macho' &&                                       
                                        <option value={animalP['id']} >
                                            {animalP['code']}  {animalP['nickname']} {animalP['certification_name']}
                                        </option>                                     
                                    }
                                </React.Fragment>
                            )
                        })}
                    </select>
                </div>
                <div className="input-group input-group-sm mb-2">
                    <div className="input-group-prepend input-detail-update">
                        <span className="input-group-text">Nombre de la madre</span>
                    </div>
                    <select className="custom-select" ref={mother_idRef} id="mother_id" defaultValue={animal.mother_id || "Desconocido"} name="mother_id" required disabled={props.propAction === 'update' ? true : false}>
                        <option value="unknown">Desconocido</option>
                        {animals && animals.map((animalM, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {animalM['sex'] == 'Hembra' &&
                                        <option value={animalM['id']}>
                                            {animalM['code']} {animalM['nickname']} {animalM['certification_name']}
                                        </option>   
                                    }
                                </React.Fragment>
                            )
                        })}
                    </select>
                </div>
                <div className="input-group input-group-sm mb-2">
                    <div className="input-group-prepend input-detail-update">
                        <span className="input-group-text">Raza del animal</span>
                    </div>
                    <select className="form-control" ref={raceRef} id="race" name="race" defaultValue={animal['race'] || ""} disabled={props.propAction === 'update' ? true : false} required>
                        <option value={animal['race'] || ""} >{animal['race']}</option>
                        <option value="Brahaman">Brahaman</option>
                        <option value="Simbra">Simbra</option>
                        <option value="Angus">Angus</option>
                        <option value="Simmental">Simmental</option>
                        <option value="Holstein">Holstein</option>
                        <option value="Nelore">Nelore</option>
                        <option value="Jersey">Jersey</option>
                        <option value="Pardo Suizo">Pardo Suizo</option>
                        <option value="Charolais">Charolais</option>
                        <option value="Brandford">Brandford</option>
                    </select>
                </div>
                {props.propAction === 'update' &&
                    <>
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Estado del animal</span>
                            </div>
                            <input className="form-control" id="animal_state" defaultValue={animal['animal_state'] || ""} disabled />
                        </div>
                        <div className="input-group input-group-sm">
                            <div className="col-md-6 mb-2">
                                <input type="submit" className="btn btn-success btn-lg w-100" value="Actualizar" id="btnUpdateAnimal" style={{ display: 'none' }} />
                            </div>
                            <div className="col-md-6">
                                <button onClick={delete_animal} className="btn btn-danger btn-lg w-100" id="btnDeleteAnimal" style={{ display: 'none' }}>Borrar Registro</button>
                            </div>
                        </div>

                    </>
                }
                {props.propAction === "register" &&
                    <input type="submit" className="btn btn-success btn-lg btn-block" value="Registrar" id="btnRegister" />
                }
            </form>
            {props.propAction === 'update' &&
                <button className="btn btn-primary btn-md btn-block" onClick={enableForm} id="btnEnableForm">Habilitar actualización de datos</button>
            }
        </>
    );
}