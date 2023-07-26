'use client'
import React, { useEffect, useState } from "react";
import NotificationsList from "../components/NotificationsList";
import { ToastContainer } from "react-toastify";
import SpinnerLoading from "../../components/SpinnerLoading";
import 'react-toastify/dist/ReactToastify.css';
import NotificationsService from "../../../services/notificationsService";
import ButtonsBar from "../../components/ButtonsBar";

export default function Index() {

    const [listIndex, setListIndex] = useState<[]>()
    const _notificationService = new NotificationsService()
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        _notificationService.index()
            .then((data) => {
                data && setListIndex(data.listActive)
            })
    }, [isUpdated])

    const reload = ()=>{
        setIsUpdated(isUpdated ? false : true)
    }

    return (
        <>  
            <ButtonsBar/>
            { listIndex && <NotificationsList reload={reload} list={listIndex} title="Listado de notificaciones activas" /> }           
        </>
      );
}