import Link from "next/link"
import Animal from "../../models/animal"
import Injectable from "../../models/injectable"

interface InjectablesTableProps {
    injectables: Injectable[]
    animal: Animal
}

export default function InjectablesTable({ injectables, animal }: InjectablesTableProps) {
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
                                    <Link className="btn btn-sm btn-info buttonsTable" href={`/injectables/injectable/detail/${injectable.creation_time}`}>Detalle</Link>
                                </td>
                                <td>
                                    <Link id="btnDeleteRegister" className="btn btn-sm btn-danger buttonsTable" href={`/injectables/injectable/delete-one/${injectable.creation_time}/${animal.id}`}>Borrar</Link>
                                </td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}