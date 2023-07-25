'use client'
import IncidentsList from "../components/IncidentsList"
import IncidentsService from "../../../services/incidentsService"
import { ToastContainer } from "react-toastify"
import { useEffect, useState } from "react"
import SpinnerLoading from "../../components/SpinnerLoading"
import ButtonsBar from "../../components/ButtonsBar"

type ButtonsObject = {
    description: string
    url: string
}

export default function Index(){

    const _incidentsService = new IncidentsService()

    const [listIndex, setListIndex] = useState([])
    const [updateList, setUpdateList] = useState(true)

    useEffect(() => {
        _incidentsService.index()
            .then((data) => {      
                data && setListIndex(data.listIncidents)
            })
    }, [,updateList])

    let delete_incident = (incident_id:number, animal_id:number) => {

        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");

        if (confirmDelete) {
            _incidentsService.delete(incident_id, animal_id)
            .finally(()=>{ setUpdateList(updateList ? false:true)})               
        }
    }

    const buttons: ButtonsObject[] = [
        {description: 'Registar incidente', url: "/incidents/register"}
    ]

    return (
        <>  
            <ButtonsBar buttons={buttons} />
            { listIndex.length > 0 ?
                <IncidentsList incidents={listIndex} deleteIncident={delete_incident} />
                :
                <><SpinnerLoading/>
                <ToastContainer/>
                </>
            }           
        </>
      );
    
}