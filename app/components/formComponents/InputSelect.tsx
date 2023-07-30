import { OptionObject } from "../../../types/types"
interface InputSelectProps{
    setData: (e:any)=>any
    entity?: {[key:string]:any} | undefined
    title: string
    name: string
    options: string[] | OptionObject[] | any[]
    isDisabled?: boolean
    defaultValue?: any
}

export default function InputSelect({setData, entity, title, name, options, isDisabled=false, defaultValue}: InputSelectProps) {
     
    return (
        <>
            <div className="input-group input-group-sm mb-2">
                <div className="input-group-prepend input-detail-update">
                    <span className="input-group-text">{title}</span>
                </div>
                <select className="form-control" onChange={(e) => setData(e.target.value)} id={name} name={name} defaultValue={ defaultValue ? String(defaultValue) : entity && entity[name] || ""} required disabled={isDisabled}>
                    { !defaultValue && <option value={entity && entity[name] || ""} >{entity && entity[name]}</option>}
                    {
                        (options && options.map((val, key)=>{
                            if (typeof val === 'string'){
                                return (<option key={key} value={val && val}>{val}</option>)
                            }else{
                                return (<option key={key} value={val.value}>{val.description}</option>)
                            }
                        }))                    
                    }
                </select>
            </div>
        </>
    )
}


