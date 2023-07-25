import { useState } from "react";
import InputDate from "./formComponents/InputDate"

interface SearchFormProps {
    title: string
    searchData: (date1: string, date2: string) => void
}

export default function SearchFormSection({ title, searchData }: SearchFormProps) {

    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("");

    return (
        <>
            <section className="frontend row justify-content-center">
                <h1 className="titulo col-md-12">{title}</h1>
                <div className="form col-lg-8" id='formDetailAnimal'>
                    <form id="form-detail-update" onSubmit={(e) => { e.preventDefault(); searchData(date1, date2)}} className="form_data form-group row">
                        <InputDate setData={setDate1} name={"date1"} title={"Ingrese la fecha inicial:"} isRequired={true}/>
                        <InputDate setData={setDate2} name={"date2"} title={"Ingrese la fecha final:"} isRequired={true}/>
                        <input type="submit" className="btn btn-success btn-lg btn-block" value="Buscar" id="btnSearch" />
                    </form>
                </div>
            </section>
        </>
    )
}