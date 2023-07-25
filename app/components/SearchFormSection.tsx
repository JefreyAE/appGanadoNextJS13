import { useEffect, useState } from "react";
import InputDate from "./formComponents/InputDate"

interface SearchFormSectionProps{
    getFormData: (fn:()=>{})=>void
}

export default function SearchFormSection({getFormData}:SearchFormSectionProps){

    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");

    useEffect(()=>{
        getFormData(()=>{
            return {date1,date2}
        })
    },[,date1,date2])
    
    return(
        <>
            <InputDate setData={setDate1} name={"date1"} title={"Ingrese la fecha inicial:"} />
            <InputDate setData={setDate2} name={"date2"} title={"Ingrese la fecha final:"} />
        </>
    )
}