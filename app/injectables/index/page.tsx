'use client'
import InjectablesList from "../components/InjectablesList"
import InjectablesService from "../../../services/injectableService"
import { useEffect, useState } from "react"
import ButtonsBar from "../../components/ButtonsBar"
import { ButtonsObject } from "../../../types/types"

export default function Index() {

    const _injectablesService = new InjectablesService()

    const [listIndex, setListIndex] = useState<[]>()
    const [updateList, setUpdateList] = useState(true)

    useEffect(() => {
        _injectablesService.index()
            .then((data) => {
                data && setListIndex(data.listInjectables)
            })
    }, [, updateList])

    const delete_injectable = (creation_time: number, animal_id: number) => {

        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");

        if (confirmDelete) {
            _injectablesService.delete(creation_time, animal_id)
                .finally(() => { setUpdateList(updateList ? false : true) })
        }
    }

    const buttons: ButtonsObject[] = [
        {description: 'Registrar injectable', url: "/injectables/register"}
    ]

    return (
        <>  
            <ButtonsBar buttons={buttons} />
            {listIndex && <InjectablesList injectables={listIndex} deleteInjectable={delete_injectable} /> }
        </>
    );

}