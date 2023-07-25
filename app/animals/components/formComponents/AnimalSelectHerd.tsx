import React from "react"
import Animal from "../../../../models/animal"
import Herd from "../../../../models/herds"

interface SelectHerdsProps {
    animal: Animal
    herds: Herd[]
    setData: (e: any) => any
    isDisabled: boolean
    title: string
}

export default function SelectHerds({ animal, herds, setData, isDisabled = false, title }: SelectHerdsProps) {
    const defaultHerd = herds.find(herd => herd.id === animal.herd_id);
    return (
        <>
            <div className="input-group input-group-sm mb-2">
                <div className="input-group-prepend input-detail-update">
                    <span className="input-group-text">{title}</span>
                </div>
                <select className="custom-select" onChange={(e) => setData(e.target.value)} id='herd_id' defaultValue={animal.herd_id || undefined} name="herd_id" required disabled={isDisabled}>
                    {animal.herd_id && <option value={animal.herd_id} >{defaultHerd && defaultHerd.name}</option>}
                    {herds && herds.map((herd, index) => {
                        return (
                            <React.Fragment key={index}>
                                {herd.id && <option value={herd.id} >
                                    {herd.name}
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