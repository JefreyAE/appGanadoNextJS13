import React, { useState, useEffect } from "react";
import { Link, Outlet, Navigate, NavLink } from "react-router-dom";
import AnimalService from "../../../services/animalService";

const AnimalIndex = () => {
  const [listActive, setList] = useState([]);
  let _animalService = new AnimalService();

  useEffect(() => {
    _animalService.index().then((res) => {
        // listActive = res.data.listActive;
        setList(res.data.listActive);
      })
      .catch((error) => {
        console.log(error.response.data); // me muestra el contenido de la respuesta con error
      });
  }, []);
  
  if(listActive.length >= 1){
    return (
      <React.Fragment>
        <div id="content" className="row">
          <Link to="/">Return to login</Link>
          <div id="sectionCentral" className="col-md-10">
            <section className="frontend row">
              <h1 className="titulo col-md-12">Listado de animales activos</h1>
              <div className="table-responsive">
                <table className="animals table table-striped table-sm table-hover table-light">
                  <thead>
                    <tr className="table-primary">
                      <th>Apodo</th>
                      <th>Nombre en certificado</th>
                      <th>Código</th>
                      <th>Fecha de nacimiento</th>
                      <th>Raza</th>
                      <th>Sexo</th>
                      <th>Ver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listActive.map((animal, index) => {
                      return (
                        <tr key={index}>
                          <td>{animal.nickname}</td>
                          <td>{animal.certification_name}</td>
                          <td>{animal.code}</td>
                          <td>{animal.birth_date.split(" ")[0]}</td>
                          <td>{animal.race}</td>
                          <td>{animal.sex}</td>
                          <td>
                            <Link
                              className="btn btn-sm btn-info"
                              to={'/animal/detail/' + animal.id}
                            >
                              Detalle
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }else{
    return(
      <h1 className="loading">Cargando...</h1>
    );
  }

 
};
export default AnimalIndex;
