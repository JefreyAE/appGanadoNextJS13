'use client'
import React, { useEffect, useState } from "react";
import NotificationsList from "../components/NotificationsList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotificationsService from "../../../services/notificationsService";
import ButtonsBar from "../../components/ButtonsBar";

export default function IndexAll() {

    const [listIndex, setListIndex] = useState<[]>()
    const _animalService = new NotificationsService()
    const [isUpdated, setIsUpdated] = useState(true)

    useEffect(() => {
        _animalService.indexAll()
            .then((data) => {
                data && setListIndex(data.listAll)
            })
    }, [isUpdated])

    const reload = ()=>{
        setIsUpdated(isUpdated ? false : true)
    }

    return (
        <>  
            <ButtonsBar />
            { listIndex && <NotificationsList reload={reload} list={listIndex} title="Listado de todas las notificaciones registradas" />}  
            <ToastContainer/>         
        </>
      );
}