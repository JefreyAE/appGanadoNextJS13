'use client'
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import SalesList from "../components/SalesList";
import SalesService from "../../../services/salesService";
import TradesList from "../../components/TradesList";
import ButtonsBar from "../../components/ButtonsBar";
import SpinnerLoading from "../../components/SpinnerLoading";

type ButtonsObject = {
    description: string
    url: string
}

export default function Index(){

    let _saleService = new SalesService()
    const [listIndex, setListIndex] = useState([])
    const [updateList, setUpdateList] = useState(true)

    useEffect(()=>{
        _saleService.index()
        .then(data =>{       
            setListIndex(data.listSales)
        })
    },[updateList])

    const updateListState = ()=>{
        setUpdateList(updateList ? false : true)
    }

    let delete_sale = (purchase_id: number, animal_id: number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");

        if (confirmDelete) {
            _saleService.delete(purchase_id, animal_id)
            .finally(()=>{updateListState()})               
        }
    }

    const buttons: ButtonsObject[] = [
        {description: 'Registar venta', url: "/sales/register"}
    ]


    return(
        <>
            <ButtonsBar buttons={buttons} />
            { listIndex && <TradesList title="Listado de ventas" tradeType={"sale"} tradesList={listIndex}/>}   
            <ToastContainer />
        </>
    )
}