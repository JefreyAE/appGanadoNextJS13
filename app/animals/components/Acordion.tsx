import React from "react";

interface AcordionProps{
    children: React.ReactNode, 
    title: string,
    id: number
}

export default function Acordion({children, title, id}:AcordionProps){
    return(
        <div className="accordion mt-3" id={`accordionExample${id}`}>
            <div className="card">
                <div className="card-header" id="headingSix">
                    <h2 className="mb-0">
                        <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                            data-target={`#collapse${id}`} aria-expanded="true" aria-controls={`collapse${id}`}>
                            <h2 className="titulo-2 ">{title}</h2>
                        </button>
                    </h2>
                </div>

                <div id={`collapse${id}`} className="collapse" aria-labelledby="headingSix" data-parent={`#accordionExample${id}`}>
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}