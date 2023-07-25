import Link from "next/link";
import Purchase from "../../../models/purchases";
import Animal from "../../../models/animal";
import { formatDate } from "../../../helpers/datesFormats";

interface PurchaseInfoProps {
    purchase: Purchase | undefined,
    animal: Animal | undefined
}

export default function PurchaseInfo({ purchase, animal }: PurchaseInfoProps) {
    return (
        <section className="frontend">
            <div className="row justify-content-center">
                <div className="col-sm-10 statistics">
                    <h2 className="titulo-2">Detalle de la compra</h2>
                    <table className="table table-sm table-hover table-light">
                        <tbody>
                            <tr>
                                <td>Animal:</td>
                                <td>{ animal && <Link href={`/animals/detail/${animal.id}`}>{animal && animal.nickname}</Link>}</td>
                            </tr>
                            <tr>
                                <td>Tipo de compra:</td>
                                <td>{purchase && purchase.purchase_type}</td>
                            </tr>
                            <tr>
                                <td>Fecha de la compra:</td>
                                <td>{purchase && purchase.purchase_date ? formatDate(purchase.purchase_date) : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Peso del animal (kg):</td>
                                <td>{purchase && purchase.weight}</td>
                            </tr>
                            <tr>
                                <td>Monto de la compra:</td>
                                <td>{purchase && purchase.price_total}</td>
                            </tr>
                            <tr>
                                <td>Precio por kilogramo:</td>
                                <td>{purchase && purchase.price_kg}</td>
                            </tr>
                            {purchase && purchase.purchase_type == "Subasta" && <>
                                <tr>
                                    <td>Nombre de la subasta:</td>
                                    <td>{purchase && purchase.auction_name}</td>
                                </tr>
                                <tr>
                                    <td>Comisión de subasta (%):</td>
                                    <td>{purchase && purchase.auction_commission}</td>
                                </tr>
                            </>
                            }
                            <tr>
                                <td>Sexo:</td>
                                <td>{animal && animal.sex}</td>
                            </tr>
                            <tr>
                                <td>Descripción:</td>
                                <td>{purchase && purchase.description}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}