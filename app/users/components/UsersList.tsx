
import React from "react";
import Link from "next/link";
import User from "../../../models/user";
import { ROLES , userStates } from '../../../helpers/enums'

interface UsersListProps {
    list: User[],
    title: string
    deleteUser?: (id:number)=> void
}

export default function UsersList({title, list, deleteUser}: UsersListProps) {
    return (
        <React.Fragment>
            <section className="frontend row">
                <h1 className="titulo col-md-12">{title}</h1>
                <div className="table-responsive">
                    <table className="animals table table-striped table-sm table-hover table-light">
                        <thead>
                            <tr className="table-primary">
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                                <th>Role</th>
                                <th>Correo de contacto</th>
                                <th>Número de teléfono</th>
                                <th>Estado de la cuenta</th>
                                <th></th>
                                {deleteUser && <th></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((user: User, index: any) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.name && user.name}</td>
                                        <td>{user.surname && user.surname}</td>
                                        <td>{user.email && user.email}</td>
                                        <td>{user.role && ROLES[user.role]}</td>
                                        <td>{user.contact_email && user.contact_email}</td>
                                        <td>{user.phone_number && user.phone_number}</td>
                                        <td>{user.state && userStates[user.state]}</td>
                                        <td>
                                            <Link
                                                className="btn btn-sm btn-info"
                                                href={'/users/admin/user/' + user.id}
                                            >
                                                Administrar
                                            </Link>
                                        </td>
                                        {deleteUser && <td><button className="btn btn-danger btn-padding-sm" onClick={e => user.id && deleteUser(user.id)}>Borrar</button></td>}
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