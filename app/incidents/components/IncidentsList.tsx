'use client'
import Incident from "../../../models/incident"
import Link from "next/link"
import { ToastContainer } from "react-toastify"

interface IncidentsProps {
    incidents: Incident[],
    deleteIncident?: (incident_id: number, animal_id: number) => void
}

export default function IncidentsList({ incidents, deleteIncident }: IncidentsProps) {

    const deleteRegister = (incident:Incident)=>{
        deleteIncident && incident.id && incident.animal && deleteIncident(incident.id, incident.animal.id)
    }
    return (
        <section className="frontend row">
            <h1 className="titulo col-md-12">Listado de incidentes registrados</h1>
            <div className="table-responsive">
                <table className="animals purchases table table-striped table-sm table-hover table-light" >
                    <thead>
                        <tr className="table-primary">
                            <th>Tipo</th>
                            <th>Animal</th>
                            <th>Fecha del incidente</th>
                            <th>Descripción</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents && incidents.map((incident, index) => (
                            <tr key={index}>
                                <td>{incident.incident_type}</td>
                                <td>
                                    <Link className="" href={'/animals/detail/' + incident.animal?.id} >
                                        {`${incident.animal?.code} ${incident.animal?.certification_name} ${incident.animal?.nickname}`}
                                    </Link>
                                </td>
                                <td>{incident.incident_date ? incident.incident_date.split(" ")[0] : 'N/A'}</td>
                                <td>{incident.description}</td>
                                {deleteIncident && <td>
                                    <button id="btnDeleteRegister" className="btn btn-sm btn-danger buttonsTable" onClick={e => deleteRegister(incident)} >Borrar</button>
                                </td>}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer/>
        </section>
    )
}