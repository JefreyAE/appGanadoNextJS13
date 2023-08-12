import React, { useState } from 'react';
import '../styles/postStyles.css'

interface OffertsSectionProps{
    offers:any[]
}

export default function OffertsSection({ offers=[] }: OffertsSectionProps) {
    const [isOffersVisible, setIsOffersVisible] = useState(false);

    const toggleOffers = () => {
        setIsOffersVisible(!isOffersVisible);
    };

    return (
        <div className="offers-section">
            <div className="offers-header" onClick={toggleOffers}>
                <h3>Ofertas</h3>
                <span>{isOffersVisible ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}</span>
            </div>
            {isOffersVisible && (
                <div className="offers-menu">
                    {/* Aquí puedes mapear las ofertas para mostrarlas */}
                    {offers.map((offer: any, index:number) => (
                         <div key={offer.id} className="offer-item">
                            {/* Contenido de cada oferta */}
                            <p>Oferta {index + 1}: {offer.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};