import Link from "next/link"
import Purchase from "../../models/purchases"

interface PurchasesListProps {
    purchases: Purchase[]
}

export default function PurchasesList({ purchases }: PurchasesListProps) {

    const handleDeleteRegister = () => {
        // Lógica para eliminar el registro
    };

    return (
        <div id="content" className="row">
            <div id="sectionCentral" className="col-md-10">
                <section className="frontend row">
                    <h1 className="titulo col-md-12">Listado de compras</h1>
                    {/* @if (session('message'))
                <div className="alert alert-success w-100">
                    {{ session('message') }}
                </div>
                @endif
                @if (session('error'))
                <div className="alert alert-danger w-100">
                    {{ session('error') }}
                </div>
                @endif */}
                    <div className="table-responsive">
                        <table className="animals purchases table table-striped table-sm table-hover table-light">
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
                                {purchases && purchases.map((purchase, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Link href={`/animals/detail/${purchase.animal_id}`}>
                                                {purchase.animal?.code} {purchase.animal?.nickname} {purchase.animal?.certification_name}
                                            </Link>
                                        </td>
                                        <td className="type">{purchase.purchase_type}</td>
                                        <td>{purchase.purchase_date ? purchase.purchase_date[0] : 'N/A'}</td>
                                        <td>{purchase.animal?.sex}</td>
                                        <td>
                                            <Link className="btn btn-sm btn-info" href={`/purchases/purchase/detail/${purchase.animal_id}/${purchase.purchase_id}`}>
                                                Detalle
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                id="btnDeleteRegister"
                                                className="btn btn-sm btn-danger buttonsTable"
                                                href={`/purchases/purchase/delete-one/${purchase.purchase_id}/${purchase.animal_id}`}
                                                onClick={handleDeleteRegister}
                                            >
                                                Borrar
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}