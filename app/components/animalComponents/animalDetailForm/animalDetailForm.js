import React, {useEffect, useState} from "react";
import AnimalService from "../../../services/animalService";
import Constants from "../../../helpers/constants";
import { NavLink } from "react-router-dom";
import Validations from "../../../helpers/validations";

const AnimalDetailForm = (props) => {

    let error = 0;

    let constants = new Constants();
    let url = constants.getUrlApi();
    let _animalService = new AnimalService();
    let validate = new Validations();

    const[message, setMessage] = useState("");
    const[status, setStatus] = useState("");

    const[animal, setAnimal] = useState([]);
    const[animals, setAnimals] = useState([]);
    const[father, setFather] = useState("");
    const[mother, setMother] = useState("");
    const[sex, setSex] = useState("");
    const[father_id, setFather_id] = useState("");
    const[mother_id, setMother_id] = useState("");
    const[race, setRace] = useState("");
    const[animal_id, setAnimal_id] = useState(0);

    const[validateNickname, setValidateNickname] = useState(true);
    const[validateCertification_name, setValidateCertification_name] = useState(true);
    const[validateRegistration_number, setValidateRegistration_number] = useState(true);
    const[validateCode, setValidateCode] = useState(true);
    const[validateBirth_weight, setValidateBirth_weight] = useState(true);

    let animal_idRef = animal_id;
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
 
    useEffect(()=>{
        setAnimal(props.animal);
        setAnimals(props.animals);
        setDefault(animal, animals);
        setAnimal_id(animal['id']);
    });

    let enableForm = (e)=>{

        var  btnEnableForm = document.querySelector('#btnEnableForm');
        var  btnUpdateAnimal = document.querySelector('#btnUpdateAnimal');
        var  btnDeleteAnimal = document.querySelector('#btnDeleteAnimal');
        
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

    function fecha(f){
        if(f !== undefined){
            var sp = f.split(' ');
            return sp[0];
        }else{
            return "";
        }    
    }

    let setDefault = (animal, animals) =>{
        animals.map((animal, index)=>{
            if(animal['sex'] == 'Macho'){
                if(animal['id'] == animal['father_id']){
                    setFather(animal['id']);
                }
            }
            if(animal['sex'] == 'Hembra'){
                if(animal['id'] == animal['mother_id']){
                    setMother(animal['id']);
                }
            }
        });
    }

    let update = (e) =>{
        if(validateNickname &&  validateBirth_weight && validateCertification_name && validateCode && validateRegistration_number){
            e.preventDefault();
            let valor = window.confirm("¿Esta seguro que desea actualizar los datos?");
            if (valor) {
                _animalService.update(animal_idRef,nicknameRef.current.value,certification_nameRef.current.value,registration_numberRef.current.value,codeRef.current.value,birth_weightRef.current.value,birth_dateRef.current.value,sexRef.current.value,father_idRef.current.value,mother_idRef.current.value,raceRef.current.value).then(res=>{
                    if(res.data.status ){
                    setMessage(res.data.message);
                    setStatus(res.data.status)
                    console.log(res.data);
                    }
                }).catch(err=>{
                    setMessage(err);
                });
            }
        }else{
            e.preventDefault();
            alert("Debes corregir los datos");
        }
    }

    return(
        
        <React.Fragment>
        <section className="frontend row justify-content-center">
        <h1 className="titulo col-md-12">Detalles del animal</h1>
        <div className="form col-lg-8" id='formDetailAnimal'>
            <h2 className="titulo-2">Información general</h2>
            {status == 'success' &&
                <div className="alert alert-success">
                 {message}
                </div>
            }
                
            {status == 'error' &&
                <div className="alert alert-danger">
                    {message}
                </div>
            }
            {true &&
                <React.Fragment>
                    <form id="form-detail-update" onSubmit={update} className="form_data form-group row">
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Apodo</span>
                            </div>
                            <input className="form-control" ref={nicknameRef} onChange={(e) => setValidateNickname(validate.validarAlfaNumerico("nickname", nicknameRef))} id="nickname" name='nickname' defaultValue={animal['nickname']}
                                type="text" disabled />
                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Nombre de certificación</span>
                            </div>
                            <input className="form-control" id="certification_name" name="certification_name" type="text"
                                defaultValue={ animal['certification_name'] } onChange={(e) => setValidateCertification_name(validate.validarAlfaNumerico("certification_name", certification_nameRef))} ref={certification_nameRef} disabled/>
                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Número de registro</span>
                            </div>
                            <input className="form-control" id="registration_number" name="registration_number" type="text"
                                defaultValue={ animal['registration_number'] } onChange={(e) => setValidateRegistration_number(validate.validarAlfaNumerico("registration_number", registration_numberRef))} ref={registration_numberRef} disabled/>
                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Peso de nacimiento</span>
                            </div>
                            <input type="text" className="form-control" onChange={(e) => setValidateBirth_weight(validate.validarNumerico("birth_weight", birth_weightRef))} ref={birth_weightRef} name="birth_weight" id="birth_weight"
                                defaultValue={ animal['birth_weight'] } disabled/>
                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Código de registro</span>
                            </div>
                            <input className="form-control" ref={codeRef} onChange={(e) => setValidateCode(validate.validarAlfaNumerico("code", codeRef))} id="code" name="code" type="text" defaultValue={animal['code'] } disabled/>
                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Fecha de nacimiento</span>
                            </div>
                            <input className="form-control" ref={birth_dateRef} id="birth_date" name="birth_date" type="date"
                                defaultValue={fecha(animal['birth_date']) || ""} disabled/>
                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Sexo del animal</span>
                            </div>
                            <select className="form-control" id="sex" ref={sexRef} name="sex" defaultValue={sex|| ""} required disabled>
                                <option value={ animal['sex'] || ""} >{ animal['sex']}</option>
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Nombre del padre</span>
                            </div>
                            <select className="custom-select" ref={father_idRef} id="father_id" defaultValue={father || "Desconocido"} name="father_id" required disabled>
                                { animal['father_id'] == 0 &&
                                    <option value="unknown" >Desconocido</option>
                                }
                                { animal['father_id'] != 0 &&
                                    <option value="unknown">Desconocido</option>
                                }
                                {animals.map((animalP, index)=>{
                                    return (
                                        <React.Fragment key={index}>
                                            {animalP['sex'] == 'Macho' &&
                                                <React.Fragment>
                                                    {animalP['id'] == animal['father_id'] &&
                                                        <option value={ animalP['id'] } >
                                                            {animalP['code'] }  { animalP['nickname'] } { animalP['certification_name'] }
                                                        </option>
                                                    }
                                                    {animalP['id'] != animal['father_id'] &&
                                                        <option value={ animalP['id'] } >
                                                            {animalP['code'] }  {animalP['nickname'] } {animalP['certification_name'] }
                                                        </option>
                                                    }
                                                </React.Fragment>
                                            }
                                        </React.Fragment>
                                    )}) 
                                }
                            </select>
                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Nombre de la madre</span>
                            </div>
                            <select className="custom-select" ref={mother_idRef} id="mother_id" defaultValue={mother || "Desconocido"}name="mother_id" required disabled>
                                {animal['mother_id'] == 0 &&
                                    <option value="unknown" >Desconocido</option>
                                }
                                {animal['mother_id'] != 0 &&
                                    <option value="unknown">Desconocido</option>
                                }
                                {animals.map((animalM, index)=>{
                                    return (
                                        <React.Fragment key={index}>
                                            {animalM['sex'] == 'Hembra' &&
                                                <React.Fragment>
                                                    {animalM['id'] == animal['mother_id'] &&
                                                        <option value={ animalM['id'] } >
                                                            {animalM['code']} {animalM['nickname'] } { animalM['certification_name'] }
                                                        </option>
                                                    }
                                                    {animalM['id'] != animal['mother_id'] &&
                                                        <option value={ animalM['id'] } >
                                                            {animalM['code']} { animalM['nickname'] } {animalM['certification_name'] }
                                                        </option>
                                                    }
                                                </React.Fragment>
                                            }
                                        </React.Fragment>
                                    )}) 
                                }       
                            </select>
                        </div>
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Raza del animal</span>
                            </div>
                            <select className="form-control" ref={raceRef} id="race" name="race" defaultValue={ animal['race'] } disabled
                                required>
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
                        <div className="input-group input-group-sm mb-2">
                            <div className="input-group-prepend input-detail-update">
                                <span className="input-group-text">Estado del animal</span>
                            </div>
                            <input className="form-control" id="animal_state" defaultValue={animal['animal_state'] || ""} disabled />
                        </div>
                        <input type="hidden" name="animal_id" id="animal_id" defaultValue={animal['id'] || ""} />
                        <div className="input-group input-group-sm">
                            <div className="col-md-6 mb-2">
                                <input type="submit" className="btn btn-success btn-lg w-100" value="Actualizar" id="btnUpdateAnimal" style={{display:'none'}} />
                            </div>       
                            <div className="col-md-6">
                                <a href= {url+'/animals/delete/'+animal['id']} className="btn btn-danger btn-lg w-100"  id="btnDeleteAnimal"  style={{display:'none'}}>Borrar Registro</a>
                            </div>    
                        </div>
                    </form>
                    <button className="btn btn-primary btn-md btn-block" onClick={enableForm} id="btnEnableForm">Habilitar actualización de datos</button>
                </React.Fragment>
            }
        </div>
    </section>
        </React.Fragment>
    );
}

export default AnimalDetailForm;