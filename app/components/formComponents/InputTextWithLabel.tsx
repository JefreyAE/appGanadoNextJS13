import { useEffect } from "react"

interface InputTextProps{
    setData: (e:any)=>any
    entity?: {[key:string]:any} | undefined
    title: string
    name: string
    isDisabled?: boolean
    placeholder?: string
    type?: string
    defaultValue?: string 
    autoComplete?: string
    isRequired?: boolean
}

export default function InputTextWithLabel({setData, entity, title, name, isDisabled=false, placeholder, type='text', defaultValue, autoComplete='nope', isRequired=true}: InputTextProps) {
    useEffect(()=>{
        setData(defaultValue)
    },[defaultValue])
    return (
        <>
            <div className="mb-3">
                <label className="form-label" htmlFor="passwordCurrent">{title}</label>
                <div>
                    <input className="form-control" onChange={(e) => { setData(e.target.value) }} id={name} name={name} type={type} autoComplete={autoComplete} defaultValue={defaultValue} disabled={isDisabled} placeholder={placeholder} required={isRequired}/>
                </div>
            </div>
        </>
    )
}