import Link from "next/link"
import Sale from "../../../models/sales"
import { formatDate } from "../../../helpers/datesFormats";

interface SalesListProps {
    title: string
    sales: Sale[],
    delete_sale?: (sale_id: number, animal_id: number) => void
}

export default function salesList({title, sales, delete_sale }: SalesListProps) {
    return (
        <section className="frontend row">
            <h1 className="titulo col-md-12">{title}</h1>
            <div className="table-responsive">
                <table className="animals sales table table-striped table-sm table-hover table-light">
                    <thead>
                        <tr className="table-primary">
                            <th>Animal</th>
                            <th className="type">Tipo de compra</th>
                            <th>Fecha de la compra</th>
                            <th>Sexo</th>
                            <th>Detalle</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales && sales.map((sale:Sale, index) => (
                            <tr key={index}>
                                <td>
                                    <Link href={`/animals/detail/${sale.animal_id}`}>
                                        {sale.animal?.code} {sale.animal?.nickname} {sale.animal?.certification_name}
                                    </Link>
                                </td>
                                <td className="type">{sale.sale_type}</td>
                                <td>{sale.sale_date ? formatDate(sale.sale_date) : 'N/A'}</td>
                                <td>{sale.animal?.sex}</td>
                                <td>
                                    <Link className="btn btn-sm btn-info" href={`/sales/detail/${sale.animal_id}/${sale.id}`}>
                                        Detalle
                                    </Link>
                                </td>
                                <td>
                                    {delete_sale && <button id="btnDeleteRegister" className="btn btn-sm btn-danger buttonsTable"
                                        onClick={(e) => sale.id && sale.animal_id && delete_sale(sale.id, sale.animal_id)}
                                    >
                                        Borrar
                                    </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}