'use client'
import Link from "next/link";
import React, { useState, useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
import { getROLE } from "../../../helpers/enums";

interface ActionsTabProps {
    entity: any
    deleteEntityFn?: (id:number)=>void
}
export default function ActionsTab({entity, deleteEntityFn}:ActionsTabProps) {
  const [showOptions, setShowOptions] = useState(false);
  const { userContext } = useContext(UserContext)

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const deleteEntity = (id:number)=>{
    deleteEntityFn && deleteEntityFn(id)
  }
  return (
    <div className="actions" onMouseLeave={handleMouseLeave}>
      <button onClick={handleOptionsClick} >
        <i className="fas fa-ellipsis-v"></i>
      </button>
      {showOptions && (
        <div className="options" >
          <ul>
            {(userContext.id === entity.user.id || userContext.role === getROLE('Administrador')) && (
              <>
                {/* <li>Archivar</li> */}
                <li><Link href={`/posts/animals/edit/${entity.id}`}>Editar</Link></li> 
              </>
            )}
            {/* <li>Reportar</li> */}
            {(userContext.id === entity.user.id || userContext.role === getROLE('Administrador')) &&
              (<>{deleteEntity && 
                <li onClick={e => deleteEntity(entity.id)}>Eliminar</li>}
                <div className="dropdown-divider"></div>
                {/* <li>Bloquear</li> */}
              </>)
            }
          </ul>
        </div>
      )}
    </div>
  );
};
