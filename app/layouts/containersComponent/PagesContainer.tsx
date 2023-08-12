'use client'
import { useEffect, useState } from "react";

export default function PagesContainer({children}: {children: React.ReactNode}) {

    const [heightStyle, setHeightStyle] = useState({})

    useEffect(() => {
        const updateHeight = () => {
            var viewportHeight = window.innerHeight*0.945;
            let styles = {
                width: '100%',
                margin: '0px auto',
                overflowy: 'scroll',
                maxHeight: viewportHeight,
                minHeight: viewportHeight
            }
            setHeightStyle(styles)
        }
        updateHeight()
        window.addEventListener("resize", updateHeight)
        return () =>{
            window && window.removeEventListener("resize", updateHeight)
        }
    }, [])

    return (             
            <div id="content" style={heightStyle} className="row">     
                <div id="sectionCentral" className="col-md-10">
                    {children}
                </div>
            </div>         
    )
}