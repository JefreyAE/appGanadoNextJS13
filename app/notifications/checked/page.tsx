'use client'
import React, { useEffect, useState } from "react";
import NotificationsList from "../components/NotificationsList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotificationsService from "../../../services/notificationsService";
import ButtonsBar from "../../components/ButtonsBar";

export default function IndexAll() {

    const [listIndex, setListIndex] = useState([])
    const _animalService = new NotificationsService()

    useEffect(() => {
        _animalService.checked()
            .then((data) => {
                data && setListIndex(data.listChecked)
            })
    }, [])


    return (
        <>  <ButtonsBar />
            { listIndex && <NotificationsList list={listIndex} title="Listado de todas las notificaciones vistas" />}      
            <ToastContainer/>     
        </>
      );
}