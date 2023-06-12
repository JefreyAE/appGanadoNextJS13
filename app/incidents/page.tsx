import Incident from "../models/incident"
import Animal from "../models/animal"

interface IncidentsProps{
    incidents: Incident[],
    animal: Animal
}

export default function IncidentsTable({incidents, animal}:IncidentsProps){
    return(
            <section className="frontend row"> 
            <h1 className="titulo col-md-12">Listado de incidentes registrados</h1>
            <div className="table-responsive">
                <table className="animals purchases table table-striped table-sm table-hover table-light" >
                    <thead>
                        <tr className="table-primary">
                            <th>Tipo</th>
                            <th>Fecha del incidente</th>
                            <th>Descripción</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents && incidents.map((incident, index)=>(
                            <tr key={index}>
                                <td>{incident.incident_type}</td>
                                <td>{incident.incident_date ? incident.incident_date.split(" ")[0] : 'N/A'}</td>
                                <td>{incident.description}</td>
                                <td><a id="btnDeleteRegister" className="btn btn-sm btn-danger buttonsTable" href={`incidents/incident/delete-one/${incident.id}/${animal.id}/2` }>Borrar</a></td>
                            </tr>
                        ))                          
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}