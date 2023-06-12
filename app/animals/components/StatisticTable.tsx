
interface StatisticTableProps{
    statistics: any
}

export default function StatisticTable({statistics}:StatisticTableProps){
    return(
        <div className="row justify-content-center">
            <div className="col-sm-10 statistics">
                <table className="table table-sm table-hover table-light">
                    <tbody>
                        <tr>
                            <td>Edad:</td>
                            <td>{statistics.age}</td>
                        </tr>
                        <tr>
                            <td>Total de crías:</td>
                            <td>{statistics.offSpringsTotal}</td>
                        </tr>
                        <tr>
                            <td>Total de crías hembras:</td>
                            <td>{statistics['offSpringsFemale']}</td>
                        </tr>
                        <tr>
                            <td>Total de crías machos:</td>
                            <td>{statistics['offSpringsMale']}</td>
                        </tr>
                        {statistics?.daughter?.birth_date &&
                            <tr>
                                <td>Primera cría hembra:</td>
                                <td><a href="{{ url('/animals/detail/'statistics['daughter']['id'])}}">{statistics.daughter.nickname} {statistics.daughter.code}</a></td>
                            </tr>
                        }
                        <tr>
                            <td>Edad de la primera cría hembra:</td>
                            <td>{statistics.daughterAge}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}