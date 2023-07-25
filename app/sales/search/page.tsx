'use client'
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TradesList from "../../components/TradesList";
import SalesService from "../../../services/salesService";
import SearchForm from "../../components/SearchForm"

export default function Search() {

    const _saleService = new SalesService();
    
    const [saleList, setSalesList] = useState<[] | undefined>();

    const searchData = (date1:string, date2:string) => {    
        _saleService.findByDate(date1, date2)
        .then(data => {setSalesList(data.listSales)});
    }
    return (
        <>
            <SearchForm title={"Búsqueda de ventas"} searchData={searchData}/>
            <ToastContainer/>
            {saleList && saleList.length > 0 ? <TradesList tradeType="sale" tradesList={saleList} title={"Resultados de la búsqueda"} /> : saleList && <h1 className="titulo col-md-12">No se encontraron resultados</h1>} 
        </>
    );

}