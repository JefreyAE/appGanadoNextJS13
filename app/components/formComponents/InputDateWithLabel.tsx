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
            <div className="mb-3">
                <label className="form-label">{title}</label>
                <input className="form-control" 
                    onChange={(e) => { setData(e.target.value) }} 
                    id={name} name={name} 
                    defaultValue={formatDate(entity && entity[name]) || ""}
                    type="date" disabled={isDisabled} required={isRequired} 
                />
            </div>
        </>
    )
}