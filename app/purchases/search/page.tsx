'use client'
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TradesList from "../../components/TradesList";
import PurchasesService from "../../../services/purchasesService";
import SearchForm from "../../components/SearchForm"

export default function Search() {

    const _purchaseService = new PurchasesService();    
    const [purchaseList, setPurchasesList] = useState<[] | undefined>();

    const searchData = (date1:string, date2:string) => {     
        _purchaseService.findByDate(date1, date2)
        .then(data => {setPurchasesList(data.listPurchases)});
    }
    return (
        <>
            <SearchForm title={"Búsqueda de compras"} searchData={searchData}/>
            <ToastContainer/>
            {purchaseList && purchaseList.length > 0 ? <TradesList tradeType="purchase"  tradesList={purchaseList} title={"Resultados de la búsqueda"} /> : purchaseList && <h1 className="titulo col-md-12">No se encontraron resultados</h1>} 
        </>
    );

}