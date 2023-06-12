import React, { useState, useEffect } from "react";
import AnimalService from "../../../services/animalService";
import { Link, NavLink } from "react-router-dom";

const AnimalDead = () => {
  const [listDead, setList] = useState([]);
  let _animalService = new AnimalService();

  useEffect(() => {
    _animalService
      .dead()
      .then((res) => {
        console.log(res.data);
        setList(res.data.listDead);
      })
      .catch((error) => {
        console.log(error.response.data); // me muestra el contenido de la respuesta con error
      });
  }, []);

  return (
    <React.Fragment>
      <div id="content" className="row">
        <Link to="/">Return to login</Link>
        <div id="sectionCentral" className="col-md-10">
          <section className="frontend row">
            <h1 className="titulo col-md-12">Listado de animales fallecidos</h1>
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
                  {listDead.map((animal, index) => {
                    return (
                      <tr key={index}>
                        <td>{animal.nickname}</td>
                        <td>{animal.certification_name}</td>
                        <td>{animal.code}</td>
                        <td>{animal.birth_date.split(" ")[0]}</td>
                        <td>{animal.race}</td>
                        <td>{animal.sex}</td>
                        <td>
                          <NavLink
                            className="btn btn-sm btn-info"
                            to="animal/detail/{animal.id}"
                          >
                            Detalle
                          </NavLink>
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
};

export default AnimalDead;
