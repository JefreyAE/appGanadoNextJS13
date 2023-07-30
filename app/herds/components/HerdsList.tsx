
import React from "react";
import Link from "next/link";
import Herd from "../../../models/herds";

interface HerdListProps {
    list: Herd[],
    title: string
}

export default function HerdsList(props: HerdListProps) {
    return (
        <React.Fragment>
            <section className="frontend row">
                <h1 className="titulo col-md-12">{props.title}</h1>
                <div className="table-responsive">
                    <table className="animals table table-striped table-sm table-hover table-light">
                        <thead>
                            <tr className="table-primary">
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Ver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.list.map((herd: Herd, index: any) => {
                                return (
                                    <tr key={index}>
                                        <td>{herd.name && herd.name}</td>
                                        <td>{herd.description && herd.description}</td>                                     
                                        <td>
                                            <Link
                                                className="btn btn-sm btn-info"
                                                href={'/herds/detail/' + herd.id}
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