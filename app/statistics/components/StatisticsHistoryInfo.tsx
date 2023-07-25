interface StatisticsInfoProps {
    statisticsData: any | undefined,
}

export default function StatisticsHistoryInfo({ statisticsData }: StatisticsInfoProps) {
    return (
        <section className="frontend">
            <div className="row justify-content-center">
                <div className="col-sm-12 statistics">
                    <h2 className="titulo-2">Historial de estadísticas</h2>
                    <table id="history-table" className="table table-hover">
                        <thead>
                            <tr className="table-primary">
                                <th className="column-head"></th>
                                {statisticsData.salesDataByYear.map((item:any,key:number)=>{
                                    return (<th key={key}>{ item.year}</th>)
                                })}                          
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td className="column-head">Cantidad de nacimientos</td>
                                {statisticsData.birthsDataByYear.map((item:any,key:number)=>{
                                    return(<td key={key}>{ item.birthsNumberByDate}</td>)
                                })}                               
                            </tr>
                            <tr>
                                <td className="column-head">Cantidad de animales vendidos</td>
                                {statisticsData.salesDataByYear.map((item:any,key:number)=>{
                                    return(<td key={key}>{ item.salesNumberByDate}</td>)
                                })}       
                            </tr>
                            <tr>
                                <td className="column-head">Monto de las ventas</td>
                                {statisticsData.salesDataByYear.map((item:any,key:number)=>{
                                    return(<td key={key}>{ item.salesAmountByDate}</td>)
                                })}  
                            </tr>
                            <tr>
                                <td className="column-head">Cantidad de animales comprados</td>
                                {statisticsData.purchasesDataByYear.map((item:any,key:number)=>{
                                    return(<td key={key}>{ item.purchasesNumberByDate}</td>)
                                })}       
                            </tr>
                            <tr>
                                <td className="column-head">Monto de las compras</td>
                                {statisticsData.purchasesDataByYear.map((item:any,key:number)=>{
                                    return (<td key={key}>{ item.purchasesAmountByDate}</td>)
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}