import { useEffect, useState } from "react";
import Constants from "../../helpers/constants";
import React from "react";
import Link from "next/link";
import ImgCarousel from "./ImgCarousel"

interface Image {
    animal_id: number,
    title: string,
    description: string,
    image_name: string
}

export default function Carousel(props: any) {
    let [contador, setContador] = useState(-1);
    const [listImages, setList] = useState([]);

    let constants = new Constants();

    useEffect(() => {
        setList(props.imagesList);
    });

    return (

        <div id="carouselExampleCaptions" className="rounded carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {listImages.map((image, index) => {
                    return (
                        <React.Fragment key={index}>
                            {index === 0 &&
                                <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                            }
                            {index !== 0 &&
                                <li data-target="#carouselExampleCaptions" data-slide-to={index}></li>
                            }
                        </React.Fragment>
                    );
                }
                )}
            </ol>
            <div className="carousel-inner">
                {listImages.map((image: Image, index) => {
                    return (
                        <React.Fragment key={index} >
                            {index === 0 &&
                                <div className="carousel-item active" key={index} >
                                    <ImgCarousel apiUrl={constants.getUrlApi()} image={image} />
                                </div>
                            }
                            {index !== 0 &&
                                <div className="carousel-item" key={index} >
                                    <ImgCarousel apiUrl={constants.getUrlApi()} image={image} />
                                </div>
                            }
                        </React.Fragment>
                    );
                }
                )}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>

        </div>
    )
}