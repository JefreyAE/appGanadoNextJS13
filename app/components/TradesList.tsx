import Link from "next/link"
import { formatDate } from "../../helpers/datesFormats";

interface TradesListProps {
    title: string
    tradeType: string
    tradesList: any[],
    delete_trade?: (trade_id: number, animal_id: number) => void
}

export default function TradesList({title, tradeType, tradesList, delete_trade }: TradesListProps) {

    return (
        <section className="frontend row">
            <h1 className="titulo col-md-12">{title}: {tradesList && tradesList.length}</h1>
            <div className="table-responsive">
                <table className="animals trades table table-striped table-sm table-hover table-light">
                    <thead>
                        <tr className="table-primary">
                            <th>Animal</th>
                            <th className="type">Tipo de {tradeType === 'purchase' ? 'compra':'venta'}</th>
                            <th>Fecha </th>
                            <th>Sexo</th>
                            <th>Detalle</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tradesList && tradesList.map((trade, index) => (
                            <tr key={index}>
                                <td>
                                    <Link href={`/animals/detail/${trade.animal_id}`}>
                                        {trade.animal?.code} {trade.animal?.nickname} {trade.animal?.certification_name}
                                    </Link>
                                </td>
                                <td >{ trade.type && trade.type }
                                </td>
                                <td>{trade.date && formatDate(trade.date)}</td>
                                <td>{trade.animal?.sex}</td>
                                <td>
                                    <Link className="btn btn-sm btn-info" href={`/${tradeType}s/detail/${trade.animal_id}/${trade.id}`}>
                                        Detalle
                                    </Link>
                                </td>
                                <td>
                                    {delete_trade && 
                                    <button id="btnDeleteRegister" className="btn btn-sm btn-danger buttonsTable"
                                        onClick={(e) => trade.id && trade.animal_id && delete_trade(trade.id, trade.animal_id)}>
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