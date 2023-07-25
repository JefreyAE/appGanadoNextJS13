import { formatDate } from "../../../helpers/datesFormats"

interface InputDateProps{
    setData: (e:any)=>any
    entity?: {[key:string]:any} | undefined
    title: string
    name: string
    isDisabled?: boolean
    isRequired?: boolean
}

export default function InputDate({setData, entity, title, name, isDisabled=false, isRequired=false}: InputDateProps) {
    return (
        <>
            <div className="input-group input-group-sm mb-2">
                <div className="input-group-prepend input-detail-update">
                    <span className="input-group-text">{title}</span>
                </div>
                <input className="form-control" onChange={(e) => { setData(e.target.value) }} id={name} name={name} defaultValue={formatDate(entity && entity[name]) || ""}
                    type="date" disabled={isDisabled} required={isRequired} />
            </div>
        </>
    )
}