
import React from "react";
import Link from "next/link";
import Animal from "../../../models/animal";
import { formatDate } from "../../../helpers/datesFormats";

interface AnimalProps {
    list: Animal[],
    title: string
}

export default function AnimalsList(props: AnimalProps) {
    return (
        <React.Fragment>
            <section className="frontend row">
                <h1 className="titulo col-md-12">{props.title}</h1>
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
                            {props.list.map((animal: Animal, index: any) => {
                                return (
                                    <tr key={index}>
                                        <td>{animal.nickname && animal.nickname}</td>
                                        <td>{animal.certification_name && animal.certification_name}</td>
                                        <td>{animal.code && animal.code}</td>
                                        <td>{animal.birth_date && formatDate(animal.birth_date)}</td>
                                        <td>{animal.race && animal.race}</td>
                                        <td>{animal.sex}</td>
                                        <td>
                                            <Link
                                                className="btn btn-sm btn-info"
                                                href={'/animals/detail/' + animal.id}
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
        </React.Fragment>

    );
}