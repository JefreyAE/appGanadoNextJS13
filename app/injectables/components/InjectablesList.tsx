import Link from "next/link"
import Injectable from "../../../models/injectable"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

interface InjectablesListProps {
    injectables: Injectable[]
    deleteInjectable?: (creation_time: number, animal_id: number) => void
}

export default function InjectablesList({ injectables, deleteInjectable }: InjectablesListProps) {
    const deleteRegister = (injectable:Injectable)=>{   
        deleteInjectable && injectable.id && injectable.creation_time && injectable.animal && deleteInjectable(injectable.creation_time, injectable.animal.id)
    }
    return (
        <section className="frontend row">
            <h1 className="titulo col-md-12">Listado de inyectables aplicados</h1>
            <div className="table-responsive">
                <table className="animals purchases table table-striped table-sm table-hover table-light" >
                    <thead>
                        <tr className="table-primary">
                            <th>Tipo</th>
                            <th>Fecha de aplicación</th>
                            <th>Nombre del producto</th>
                            <th>Periodo de retiro (días)</th>
                            <th>Tiempo de efectividad (días)</th>
                            <th>Ver aplicación</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {injectables && injectables.map((injectable, index) =>
                        (
                            <tr key={index}>
                                <td>{injectable.injectable_type}</td>
                                <td>{injectable.application_date ? injectable.application_date.split(" ")[0] : 'N/A'}</td>
                                <td>{injectable.injectable_name}</td>
                                <td>{injectable.withdrawal_time}</td>
                                <td>{injectable.effective_time}</td>
                                <td>
                                    <Link className="btn btn-sm btn-info buttonsTable" href={`/injectables/detail/${injectable.creation_time}`}>Detalle</Link>
                                </td>
                                {deleteInjectable && <td>
                                    <button id="btnDeleteRegister" className="btn btn-sm btn-danger buttonsTable" onClick={e => deleteRegister(injectable)}>Borrar</button>
                                </td>}
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </section>
    )
}