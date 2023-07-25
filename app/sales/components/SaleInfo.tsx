import Link from "next/link";
import Sale from "../../../models/sales";
import Animal from "../../../models/animal";
import { formatDate } from "../../../helpers/datesFormats";

interface SaleInfoProps {
    sale: Sale | undefined,
    animal: Animal | undefined
}

export default function saleInfo({ sale, animal }: SaleInfoProps) {
    return (
        <section className="frontend">
            <div className="row justify-content-center">
                <div className="col-sm-10 statistics">
                    <h2 className="titulo-2">Detalle de la venta</h2>
                    <table className="table table-sm table-hover table-light">
                        <tbody>
                            <tr>
                                <td>Animal:</td>
                                <td>{ animal && <Link href={`/animals/detail/${animal.id}`}>{animal && animal.nickname}</Link>}</td>
                            </tr>
                            <tr>
                                <td>Tipo de venta:</td>
                                <td>{sale && sale.sale_type}</td>
                            </tr>
                            <tr>
                                <td>Fecha de la venta:</td>
                                <td>{sale && sale.sale_date ? formatDate(sale.sale_date) : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Peso del animal (kg):</td>
                                <td>{sale && sale.weight}</td>
                            </tr>
                            <tr>
                                <td>Monto de la venta:</td>
                                <td>{sale && sale.price_total}</td>
                            </tr>
                            <tr>
                                <td>Precio por kilogramo:</td>
                                <td>{sale && sale.price_kg}</td>
                            </tr>
                            {sale && sale.sale_type == "Subasta" && <>
                                <tr>
                                    <td>Nombre de la subasta:</td>
                                    <td>{sale && sale.auction_name}</td>
                                </tr>
                                <tr>
                                    <td>Comisión de subasta (%):</td>
                                    <td>{sale && sale.auction_commission}</td>
                                </tr>
                            </>
                            }
                            <tr>
                                <td>Sexo:</td>
                                <td>{animal && animal.sex}</td>
                            </tr>
                            <tr>
                                <td>Descripción:</td>
                                <td>{sale && sale.description}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}