
interface InputTextAreaProps{
    setData: (e:any)=>any
    entity?: {[key:string]:any} | undefined
    title: string
    name: string
    isDisabled?: boolean
}

export default function InputTextArea({setData, entity, title, name, isDisabled=false}: InputTextAreaProps) {
    
    return (
        <>
            <div className="input-group input-group-sm mb-2">
                <div className="input-group-prepend input-detail-update">
                    <span className="input-group-text">{title}</span>
                </div>
                <textarea className="form-control" onChange={(e) => { setData(e.target.value) }} id={name} name={name} defaultValue={entity && entity[name] || ""}
                     disabled={isDisabled} required/> 
            </div>
        </>
    )
}