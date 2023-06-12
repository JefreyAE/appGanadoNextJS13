import Animal from "../../models/animal"

interface OffSpringsProps {
    offSprings: Animal[],
    animal: Animal
}
export default function OffSpringsTable({ offSprings, animal }: OffSpringsProps) {
    return (
        <section className="frontend row">
            <h1 className="titulo col-lg-12">Descendencia</h1>
            <div className="table-responsive">
                <table className="animals table offspring table-striped table-sm table-hover table-light">
                    <thead>
                        <tr className="table-primary">
                            <th>Apodo</th>
                            <th className="registration-number">Número de registro</th>
                            <th>Código</th>
                            <th>Fecha de nacimiento</th>
                            <th>Sexo</th>
                            <th>Estado</th>
                            {animal && animal.sex === 'Macho' &&
                                <th>Padre</th>
                            }
                            {animal && animal.sex === 'Hembra' &&
                                <th>Madre</th>
                            }
                            <th>Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offSprings && offSprings.map((animalOff, index) => (
                            <tr key={index}>
                                <td>{animalOff.nickname}</td>
                                <td className="registration-number">{animalOff.registration_number}</td>
                                <td>{animalOff.code}</td>
                                <td>{animalOff.birth_date.split(" ")[0]}</td>
                                <td>{animalOff.sex}</td>
                                <td>{animalOff.animal_state}</td>
                                {animal && animal.sex !== 'Macho' &&
                                    <>
                                        {animalOff.father && animalOff.father.id ?
                                            animalOff.father.id === 0 ? <td>Desconocido</td> :
                                                <td>
                                                    <a id="father" href={`/animals/detail/${animalOff.father.id}`}>{animalOff.father.code} {animalOff.father.nickname}</a>
                                                </td> : <td>Desconocido</td>
                                        }
                                    </>
                                }
                                {animal && animal.sex !== 'Hembra' &&
                                    <>
                                        {animalOff.mother && animalOff.mother.id ?
                                            animalOff.mother.id === 0 ? <td>Desconocido</td> :
                                                <td>
                                                    <a id="mother" href={`/animals/detail/${animalOff.mother.id}`}>{animalOff.mother.code} {animalOff.mother.nickname}</a>
                                                </td> : <td>Desconocido</td>
                                        }
                                    </>
                                }
                                <td><a className="btn btn-sm btn-info" href={`/animals/detail/${animalOff.id}`}>Detalle</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}