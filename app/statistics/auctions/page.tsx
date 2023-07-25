'use client'
import React, { useEffect, useState } from "react";
import StatisticsService from '../../../services/statisticsService'
import StatisticsAuctions from '../components/StatisticsAuctions'

import { ToastContainer } from "react-toastify";
import SpinnerLoading from "../../components/SpinnerLoading";
import 'react-toastify/dist/ReactToastify.css';
import ButtonsBar from "../../components/ButtonsBar";

export default function AuctionsPrices() {

    const [statisticsData, setStatisticsData] = useState()
    const _statisticsService = new StatisticsService()

    useEffect(() => {
        _statisticsService.auctionsPrices()
            .then((data) => {
                console.log(data);

                data && setStatisticsData(data.listStatisticsAuctions)
            })
    }, [])

    return (
        <>  <ButtonsBar/>
            {statisticsData ?
                <>
                    <StatisticsAuctions listStatisticsAuctions={statisticsData} />
                </>
                :
                <><SpinnerLoading />
                    <ToastContainer />
                </>
            }
        </>
    );
}