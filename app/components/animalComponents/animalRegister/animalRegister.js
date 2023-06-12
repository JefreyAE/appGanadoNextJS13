import React, {useEffect, useState} from "react";
import AnimalService from "../../../services/animalService";
import Constants from "../../../helpers/constants";
import Validations from "../../../helpers/validations";

const AnimalRegister = (props) => {

    let constants = new Constants();
    let url = constants.getUrlApi();
    let _animalService = new AnimalService();
    let validate = new Validations();

    const[message, setMessage] = useState("");
    const[status, setStatus] = useState("");

    const[animals, setAnimals] = useState([]);

    const[isValidNickname, setValidateNickname] = useState(true);
    const[isValidCertification_name, setValidateCertification_name] = useState(true);
    const[isValidRegistration_number, setValidateRegistration_number] = useState(true);
    const[isValidCode, setValidateCode] = useState(true);
    const[isValidBirth_weight, setValidateBirth_weight] = useState(true);

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
        
        _animalService.index().then((res) => {
            // console.log(res.data.listActive);
             // listActive = res.data.listActive;
             setAnimals(res.data.listActive);
         })
         .catch((error) => {
             console.log(error); // me muestra el contenido de la respuesta con error
         });
    });

    let register = (e) => {
        if(isValidNickname &&  isValidBirth_weight && isValidCertification_name && isValidCode && isValidRegistration_number){
            e.preventDefault();
            let valor = window.confirm("¿Esta seguro que desea registrar le animal?");
            if (valor) {
                _animalService.register(nicknameRef.current.value,certification_nameRef.current.value,registration_numberRef.current.value,codeRef.current.value,birth_weightRef.current.value,birth_dateRef.current.value,sexRef.current.value,father_idRef.current.value,mother_idRef.current.value,raceRef.current.value)
                .then(res=>{
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

    function fecha(f){
        if(f !== undefined){
            var sp = f.split(' ');
            return sp[0];
        }else{
            return "";
        }    
    }

    return (
        <React.Fragment>
            <section className="frontend row justify-content-center">
                <h1 className="titulo col-md-12">Registro de nacimientos</h1>
                <div className="form col-lg-8" id='formDetailAnimal'>
                    <h2 className="titulo-2">Información general</h2>
                    {status === 'success' &&
                        <div className="alert alert-success">
                        {message}
                        </div>
                    }
                        
                    {status === 'error' &&
                        <div className="alert alert-danger">
                            {message}
                        </div>
                    }
                    {true &&
                        <React.Fragment>
                            <form id="form-detail-update" onSubmit={register} className="form_data form-group row">
                                <div className="input-group input-group-sm mb-2">
                                    <div className="input-group-prepend input-detail-update">
                                        <span className="input-group-text">Apodo</span>
                                    </div>
                                    <input className="form-control" ref={nicknameRef} onChange={(e) => setValidateNickname(validate.validarAlfaNumerico("nickname", nicknameRef))} id="nickname" name='nickname' 
                                        type="text" />
                                </div>
                                <div className="input-group input-group-sm mb-2">
                                    <div className="input-group-prepend input-detail-update">
                                        <span className="input-group-text">Nombre de certificación</span>
                                    </div>
                                    <input className="form-control" id="certification_name" name="certification_name" type="text"
                                        onChange={(e) => setValidateCertification_name(validate.validarAlfaNumerico("certification_name", certification_nameRef))} ref={certification_nameRef} />
                                </div>
                                <div className="input-group input-group-sm mb-2">
                                    <div className="input-group-prepend input-detail-update">
                                        <span className="input-group-text">Número de registro</span>
                                    </div>
                                    <input className="form-control" id="registration_number" name="registration_number" type="text"
                                     onChange={(e) => setValidateRegistration_number(validate.validarAlfaNumerico("registration_number", registration_numberRef))} ref={registration_numberRef}  />
                                </div>
                                <div className="input-group input-group-sm mb-2">
                                    <div className="input-group-prepend input-detail-update">
                                        <span className="input-group-text">Peso de nacimiento</span>
                                    </div>
                                    <input type="text" className="form-control" onChange={(e) => setValidateBirth_weight(validate.validarNumerico("birth_weight", birth_weightRef))} ref={birth_weightRef} name="birth_weight" id="birth_weight"/>
                                </div>
                                <div className="input-group input-group-sm mb-2">
                                    <div className="input-group-prepend input-detail-update">
                                        <span className="input-group-text">Código de registro</span>
                                    </div>
                                    <input className="form-control" ref={codeRef} onChange={(e) => setValidateCode(validate.validarAlfaNumerico("code", codeRef))} id="code" name="code" type="text" />
                                </div>
                                <div className="input-group input-group-sm mb-2">
                                    <div className="input-group-prepend input-detail-update">
                                        <span className="input-group-text">Fecha de nacimiento</span>
                                    </div>
                                    <input className="form-control" ref={birth_dateRef} id="birth_date" name="birth_date" type="date"/>
                                </div>
                                <div className="input-group input-group-sm mb-2">
                                    <div className="input-group-prepend input-detail-update">
                                        <span className="input-group-text">Sexo del animal</span>
                                    </div>
                                    <select className="form-control" id="sex" ref={sexRef} name="sex" required >
                                        <option value="Macho">Macho</option>
                                        <option value="Hembra">Hembra</option>
                                    </select>
                                </div>
                                <div className="input-group input-group-sm mb-2">
                                    <div className="input-group-prepend input-detail-update">
                                        <span className="input-group-text">Nombre del padre</span>
                                    </div>
                                    <select className="custom-select" ref={father_idRef} id="father_id" name="father_id" required >
                                        <option value="unknown" >Desconocido</option>
                                        {animals.map((animalP, index)=>{
                                            return (
                                                <React.Fragment key={index}>
                                                    {animalP['sex'] === 'Macho' &&
                                                        <React.Fragment>
                                                            <option value={ animalP['id'] } >
                                                                {animalP['code'] }  {animalP['nickname'] } {animalP['certification_name'] }
                                                            </option> 
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
                                    <select className="custom-select" ref={mother_idRef} id="mother_id" name="mother_id" required >
                                        <option value="unknown" >Desconocido</option>
                                        {animals.map((animalM, index)=>{
                                            return (
                                                <React.Fragment key={index}>
                                                    {animalM['sex'] === 'Hembra' &&
                                                        <React.Fragment>
                                                            <option value={ animalM['id'] } >
                                                                {animalM['code']} { animalM['nickname'] } {animalM['certification_name'] }
                                                            </option>
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
                                    <select className="form-control" ref={raceRef} id="race" name="race" 
                                        required>
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
                                <input type="submit" className="btn btn-success btn-lg btn-block" value="Registrar" id="btnRegister" />
                            </form>               
                        </React.Fragment>
                    }
                </div>
            </section>
        </React.Fragment>
    )
}

export default AnimalRegister;