
interface InputTextProps{
    setData: (e:any)=>any
    entity?: {[key:string]:any} | undefined
    title: string
    name: string
    isDisabled?: boolean
    isRequired?: boolean
}

export default function InputText({setData, entity, title, name, isDisabled=false, isRequired=false}: InputTextProps) {
    
    return (
        <>
            <div className="input-group input-group-sm mb-2">
                <div className="input-group-prepend input-detail-update">
                    <span className="input-group-text">{title}</span>
                </div>
                <input className="form-control" onChange={(e) => { setData(e.target.value) }} id={name} name={name} defaultValue={entity && entity[name] || ""}
                    type="text" disabled={isDisabled} required={isRequired}/>
            </div>
        </>
    )
}