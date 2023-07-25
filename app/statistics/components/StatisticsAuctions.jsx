import React from 'react';

function AuctionStatistics({ listStatisticsAuctions }) {
  return (
    <section className="frontend">
      <div className="row justify-content-center">
        <div className="col-md-12 statistics">
          <h1 className="titulo mt-3">Precios en subasta de los últimos 15 días</h1>
          <div id="statisticsAuctions" className="row">
            {listStatisticsAuctions.map((value1, key1) => {
              return Object.entries(value1).map(([auction_name, value2]) => {
                if (value2.length !== 0) {
                  return (
                    <div className="table-responsive" key={auction_name}>
                      <table className="auctionsTable table border table-sm">
                       
                          <tr className="col-md-12">
                            <td className='auctionNameContainer'>
                              <label className="auctionName ml-3">{auction_name}</label>
                            </td>
                            {value2.map((value3, key2) => {
                              return Object.entries(value3).map(([range, value4]) => {
                                return (
                                  <th key={range}>
                                    <div className="range">Rango de peso entre {range} kilogramos</div>
                                    {value4.map((value5, key3) => {
                                      return Object.entries(value5).map(([date, value6]) => {
                                        return (
                                          <React.Fragment key={date}>
                                            <div className="date">Fecha: {date}</div>
                                            <div className="striped1">Máximo Macho: {value6.max_price_male}</div>
                                            <div className="striped2">Máximo Hembra: {value6.max_price_female}</div>
                                            <div className="striped1">Promedio Macho: {value6.avg_price_male}</div>
                                            <div className="striped2 lastPrices">Promedio Hembra: {value6.avg_price_female}</div>
                                          </React.Fragment>
                                        );
                                      });
                                    })}
                                  </th>
                                );
                              });
                            })}
                          </tr>
                        
                      </table>
                    </div>
                  );
                }
              });
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuctionStatistics;
