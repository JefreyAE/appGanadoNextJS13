'use client'
import React, { useEffect, useState } from "react";
import UsersList from "../../components/UsersList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserService from "../../../../services/userService";
import ButtonsBar from "../../../components/ButtonsBar";
import useAdminAuthorization from "../../../../hooks/useAdminAuthorization";
import { ButtonsObject } from "../../../../types/types";

export default function Index() {

    const [listIndex, setListIndex] = useState<[]>()
    const _userService = new UserService()
    const [updateList, setUpdateList] = useState(true)
    useAdminAuthorization(true)

    useEffect(() => {
        _userService.index()
            .then((data) => {
                data && setListIndex(data.listUsers)
            })
    }, [updateList])

    const deleteUser = (id: number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?")

        if (confirmDelete) {
            _userService.deleteByAdmin(id).
                then(()=> setUpdateList(updateList ? false : true))
        }
    }

    const buttons: ButtonsObject[] = [
        {description: 'Crear nuevo usuario', url: "/users/admin/create"}
    ]

    return (
        <>  
            { listIndex &&
                (<>
                    <ButtonsBar buttons={buttons} />
                    <UsersList list={listIndex} title="Lista de usuarios registrados" deleteUser={deleteUser}/>   
                </>)
            } 
            <ToastContainer/>          
        </>
      );
}