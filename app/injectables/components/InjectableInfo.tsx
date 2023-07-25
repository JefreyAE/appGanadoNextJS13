
import { formatDate } from "../../../helpers/datesFormats";
import Injectable from "../../../models/injectable";

interface InjectableInfoProps {
    injectable: Injectable | undefined,
}

export default function InjectableInfo({ injectable }: InjectableInfoProps) {
    return (
        <>
            {injectable && <section className="frontend">
                <div className="row justify-content-center">
                    <div className="col-sm-10 statistics">
                        <h2 className="titulo-2">Detalle del inyectable aplicado</h2>
                        <table className="table table-sm table-hover table-light">
                            <tbody>
                                <tr>
                                    <td>Tipo:</td>
                                    <td>{injectable && injectable.injectable_type}</td>
                                </tr>
                                <tr>
                                    <td>Fecha de aplicación:</td>
                                    <td>{injectable && injectable.application_date ? formatDate(injectable.application_date) : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>Nombre del producto:</td>
                                    <td>{injectable && injectable.injectable_name}</td>
                                </tr>
                                <tr>
                                    <td>Marca:</td>
                                    <td>{injectable && injectable.injectable_brand}</td>
                                </tr>
                                <tr>
                                    <td>Periodo de retiro:</td>
                                    <td>{injectable && injectable.withdrawal_time}</td>
                                </tr>
                                <tr>
                                    <td>Periodo de efectividad:</td>
                                    <td>{injectable && injectable.effective_time}</td>
                                </tr>
                                <tr>
                                    <td>Descripción:</td>
                                    <td>{injectable && injectable.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            }
        </>
    )
}