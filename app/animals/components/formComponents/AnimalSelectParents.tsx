import React from "react"
import Animal from "../../../../models/animal"

interface SelectParentsProps{
    animal: Animal
    animals: Animal[]
    setParentId: (e:any)=>any
    parent: string
    isDisabled: boolean
}

export default function SelectParents({animal, animals, setParentId, parent='father', isDisabled=false}: SelectParentsProps){

    return(
        <>
            <div className="input-group input-group-sm mb-2">
            <div className="input-group-prepend input-detail-update">
                <span className="input-group-text">{parent === 'father' ? "Nombre del padre" : "Nombre de la madre"}</span>
            </div>
            <select className="custom-select" onChange={(e) => setParentId(e.target.value)} id={`${parent}_id`} defaultValue={parent === "father" ? animal.father?.id ? `${animal.father?.id}` : "unknown" : animal.mother?.id ? `${animal.mother?.id}` : "unknown"} name={`${parent}_id`} required disabled={isDisabled}>
                <option value="unknown" >Desconocido</option>
                {animals && animals.map((animal, index) => {
                    return (
                        <React.Fragment key={index}>
                            {animal['sex'] === ( parent === "father" ? 'Macho' : 'Hembra') &&
                                <option value={animal['id']} >
                                    {animal['code']}  {animal['nickname']} {animal['certification_name']}
                                </option>
                            }
                        </React.Fragment>
                    )
                })}
            </select>
        </div>
        </>
    )
}