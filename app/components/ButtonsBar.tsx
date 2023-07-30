
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonsObject } from "../../types/types";

interface ButtonsBarProps {
    buttons?: ButtonsObject[]
    isVisible?: boolean
}

export default function ButtonsBar({ buttons, isVisible = true }: ButtonsBarProps) {
    const router = useRouter()

    const hidde = {
        display: 'none'
    }

    const show = {
        display: 'block'
    }
    const goBack = ()=>{
        router.back()
    }

    return (
        <>
            <section id="sectionButtons" className="sectionButtons row" style={isVisible ? show : hidde}>
                <div className="buttons-bar-container">
                <button className="goBack-btn btn-bar fa-solid fa-arrow-left-long" onClick={goBack}></button>
                {buttons && buttons.map((button, index) => {
                    return (<Link key={index} href={button.url} className="add-btn btn-bar">{button.description}</Link>)
                })
                }
                </div>
            </section>
        </>
    );
}