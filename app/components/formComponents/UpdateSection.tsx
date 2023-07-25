import { useRef } from "react";

interface UpdateSectionProps{
    delete_function?: (e:any)=>void,
    enableInputs: ()=>void
}

export default function UpdateSection({delete_function, enableInputs}:UpdateSectionProps) {

    const btnEnableFormRef = useRef<HTMLButtonElement | null>(null);
    const btnUpdateRef = useRef<HTMLInputElement | null>(null);
    const btnDeleteRef =useRef<HTMLButtonElement | null>(null);

    let enableForm = (e: any) => {       
        enableInputs();
        e.preventDefault();

        if(btnEnableFormRef.current !== null){ btnEnableFormRef.current.style.display = "none"}
        if(btnUpdateRef.current !== null){ btnUpdateRef.current.style.display = "inline"}
        if(btnDeleteRef.current !== null){ btnDeleteRef.current.style.display = "block"}
    }

    return (
        <>
            <div className="input-group input-group-sm">
                <div className="col-md-6 mb-2">
                    <input type="submit" ref={btnUpdateRef} className="btn btn-success btn-lg w-100" value="Actualizar" id="btnUpdate" style={{ display: 'none' }} />
                </div>
                <div className="col-md-6">
                    <button onClick={delete_function} ref={btnDeleteRef} className="btn btn-danger btn-lg w-100" id="btnDelete" style={{ display: 'none' }}>Borrar Registro</button>
                </div>
            </div>
            <button className="btn btn-primary btn-md btn-block" ref={btnEnableFormRef} onClick={enableForm} id="btnEnableForm">Habilitar formulario</button>
        </>
    )
}