'use client'
import { useEffect, useState } from "react"
import PurchasesService from "../../../services/purchasesService"
import TradesList from "../../components/TradesList"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import ButtonsBar from "../../components/ButtonsBar";
import { ButtonsObject } from "../../../types/types";

export default function Index(){

    let _purchaseService = new PurchasesService()
    const [listIndex, setListIndex] = useState([])
    const [updateList, setUpdateList] = useState(true)

    useEffect(()=>{
        _purchaseService.index()
        .then(data =>{        
            setListIndex(data.listPurchases)
        })
    },[updateList])

    const updateListState = ()=>{
        setUpdateList(updateList ? false : true)
    }

    let delete_purchase = (purchase_id: number, animal_id: number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");

        if (confirmDelete) {
            _purchaseService.delete(purchase_id, animal_id)
            .finally(()=>{updateListState()})               
        }
    }

    const buttons: ButtonsObject[] = [
        {description: 'Registar compra', url: "/purchases/register"}
    ]

    return(
        <>
            <ButtonsBar buttons={buttons} />
            { listIndex && <TradesList title="Listado de compras" tradeType={"purchase"} tradesList={listIndex}/>}           
            <ToastContainer />
        </>
    )
}