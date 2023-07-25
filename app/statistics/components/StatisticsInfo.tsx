
interface StatisticsInfoProps {
    statisticsData: any | undefined,
}

export default function StatisticsInfo({ statisticsData }: StatisticsInfoProps) {
    return (
        <section className="frontend">
             <h1 className="titulo">Estadísticas globales</h1>
            <div className="row justify-content-center">
                <div className="col-sm-10 statistics">
                    <h2 className="titulo-2">Resumen del año en curso</h2>
                    <table className="table table-sm table-hover table-light">
                        <tbody>
                            <tr>
                                <td>Animales activos:</td>
                                <td>{ statisticsData.activeAnimalNumber }</td>
                            </tr>
                            <tr>
                                <td>Cantidad de nacimientos en el último año:</td>
                                <td>{ statisticsData.birthsDataByYear[0].birthsNumberByDate }</td>
                            </tr>
                            <tr>
                                <td>Cantidad de animales vendidos en el último año:</td>
                                <td>{ statisticsData.salesDataByYear[0].salesNumberByDate }</td>
                            </tr>
                            <tr>
                                <td>Monto de las ventas en el último año:</td>
                                <td>{ statisticsData.salesDataByYear[0].salesAmountByDate }</td>
                            </tr>
                            <tr>
                                <td>Cantidad de animales comprados en el último año:</td>
                                <td>{ statisticsData.purchasesDataByYear[0].purchasesNumberByDate }</td>
                            </tr>
                            <tr>
                                <td>Monto de las compras en el último año:</td>
                                <td>{ statisticsData.purchasesDataByYear[0].purchasesAmountByDate }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}