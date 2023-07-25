'use client'
import React, { useEffect, useState } from "react";
import StatisticsService from '../../../services/statisticsService'

import { ToastContainer } from "react-toastify";
import SpinnerLoading from "../../components/SpinnerLoading";
import 'react-toastify/dist/ReactToastify.css';
import StatisticsInfo from "../components/StatisticsInfo";
import StatisticsHistoryInfo from "../components/StatisticsHistoryInfo";
import ButtonsBar from "../../components/ButtonsBar";

export default function Index() {

    const [statisticsData, setStatisticsData] = useState()
    const _statisticsService = new StatisticsService()

    useEffect(() => {
        _statisticsService.index()
            .then((data) => {
                data && setStatisticsData(data.listStatisticsGlobal)
            })
    }, [])

    return (
        <>  <ButtonsBar/>
            {statisticsData ?
                <>
                    <StatisticsInfo statisticsData={statisticsData} />
                    <StatisticsHistoryInfo statisticsData={statisticsData} />
                </>
                :
                <><SpinnerLoading />
                    <ToastContainer />
                </>
            }
        </>
    );
}