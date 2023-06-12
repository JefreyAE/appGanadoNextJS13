'use client'
import { useEffect, useState } from "react"
import PurchasesService from "../../services/purchasesService"
import PurchasesList from "../components/purchasesList"

export default function Index(){

    let _purchaseService = new PurchasesService()
    const [listIndex, setListIndex] = useState([])

    useEffect(()=>{
        _purchaseService.index()
        .then(response => response.json())
        .then(data =>{
            setListIndex(data.listPurchases)
        })
    },[])

    return(
        <PurchasesList purchases={listIndex}/>
    )
}