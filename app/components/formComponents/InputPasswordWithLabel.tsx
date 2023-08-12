'use client'
import { useEffect, useState } from "react"

interface InputTextProps{
    setData: (e:any)=>any
    entity?: {[key:string]:any} | undefined
    title: string
    name: string
    isDisabled?: boolean
    placeholder?: string
    value?: string
    autoComplete?: string
    onBlur?: ()=>void
}

export default function InputPasswordWithLabel({setData, entity, title, name, isDisabled=false, placeholder, value, autoComplete='new-password', onBlur}: InputTextProps) {

    const [eyeClass, setEyeClass] = useState('fa-solid fa-eye')
    const [type, setType] = useState('password')

    const toggleEye = ()=>{
        setEyeClass(eyeClass === 'fa-solid fa-eye' ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye')
        setType(type === "password" ? "text" : "password")
    }

    useEffect(()=>{
        value && setData(value)
    })

    return (
        <>
            <div className="mb-3">
                <label className="form-label" htmlFor="passwordCurrent">{title}</label>
                <div className="password-container">
                    <input className="form-control" onBlur={onBlur} onChange={(e) => { setData(e.target.value) }} defaultValue={value} id={name} autoComplete={autoComplete} name={name} type={type} disabled={isDisabled} placeholder={placeholder} required/>
                    <i className={eyeClass} id="eye" onClick={toggleEye}></i>
                </div>
            </div>
        </>
    )
}