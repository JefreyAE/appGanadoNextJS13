'use client'
import React from "react";
import Link from "next/link";
import notification from "../../../models/notification";
import { formatDate } from "../../../helpers/datesFormats";
import NotificationsService from "../../../services/notificationsService";

interface notificationsProps {
    list: notification[] | undefined,
    title: string,
    reload?: ()=>void
}

export default function notificationsList({list, title, reload}: notificationsProps) {

    const _notificationService = new NotificationsService()

    const checkNotification = (id: number) => {
        _notificationService.checkNotification(id)
        .then((data)=>{reload && reload() })    
             
    }

    return (
        <React.Fragment>
            <section className="frontend row">
                <h1 className="titulo col-md-12">{title}</h1>
                <div className="table-responsive">
                    <table className="notificationss table table-striped table-sm table-hover table-light">
                        <thead>
                            <tr className="table-primary">
                                <th align="center" scope="col">Fecha de la notificación</th>
                                <th scope="col">Tipo de notificación</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Descripción</th> 
                                <th scope="col">Ver el detalle</th> 
                                <th scope="col">Modificar estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map((notification: notification, index: any) => {
                                return (
                                    <tr key={index}>
                                        <td>{notification.notification_date && formatDate(notification.notification_date)}</td>
                                        <td>{notification.notification_type && notification.notification_type}</td>
                                        <td>{notification.notification_state && notification.notification_state}</td>
                                        <td>{notification.description && notification.description}</td>
                                        { notification.notification_type === "Destete" ? 
                                        <td><Link href={`/animals/detail/${notification.code}`}>{notification.animal && notification.animal.nickname} {notification.animal && notification.animal.registration_number}</Link></td> : ""
                                        }
                                        { notification.notification_type === "Injectable" ? 
                                        <td><Link href={`/injectables/injectable/detail/${notification.code}`}>Ver inyectale</Link></td> : ""
                                        }
                                        { notification.notification_state === "Active" ? 
                                        <td><button className="btn btn-sm btn-info" onClick={(e)=>{checkNotification(notification.id)}}>Marcar como visto</button></td> : ""
                                        }
                                        { notification.notification_state === "Checked" ? 
                                        <td>Vista</td> : ""
                                        }
    
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