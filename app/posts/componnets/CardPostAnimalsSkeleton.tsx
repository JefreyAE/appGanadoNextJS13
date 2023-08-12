
import React from "react";
import '../styles/postStyles.css'

export default function CardPostAnimalsSkeleton() {
    return (
        <div className="card-loading">
            <div className="header">
                <span>
                    <a className="" href="#">
                        <img className="avatar skeleton" alt="" />
                        <span className="ml-1 skeleton"></span>
                    </a>
                </span>
                <div className="actions">
                    <button><i className="fas "></i></button>
                </div>
            </div>
            <div className="carousel">
                <div className="skeleton"></div>
            </div>
            <div className="actions-bar">
                <button><i className="" ></i></button>
                <span className="skeleton"></span>
                <button><i className="skeleton"></i></button>
            </div>
            <div className="description">
                <span className="skeleton"> </span>
            </div>
            <div className="offers-section">
                <div className="offers-header">
                    <h3 className="skeleton"></h3>
                    <span><i className="fa-solid"></i></span>
                </div>
            </div>
        </div>
    );
}