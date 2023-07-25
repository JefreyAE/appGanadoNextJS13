'use client'
import React, { useEffect, useState } from "react";
import NotificationsList from "../components/NotificationsList";
import { ToastContainer } from "react-toastify";
import SpinnerLoading from "../../components/SpinnerLoading";
import 'react-toastify/dist/ReactToastify.css';
import NotificationsService from "../../../services/notificationsService";
import ButtonsBar from "../../components/ButtonsBar";

export default function IndexAll() {

    const [list, setListIndex] = useState([])
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
        <>  <ButtonsBar />
            { list && list.length >= 0 ?
                list && <NotificationsList reload={reload} list={list} title="Listado de todas las notificaciones registradas" />
                :<>
                <SpinnerLoading/>
                <ToastContainer/>
                </>
            }           
        </>
      );
}