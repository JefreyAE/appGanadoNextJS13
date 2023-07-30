'use client'
import React from "react";
import ImgCarousel from "./ImgCarousel"
import { Image } from "../../../types/types";

interface CarouselProps {
    listImages: any
    delete_image?: (image_name: string, animal_id: number, user_id: number) => void | null
}

export default function Carousel({ listImages, delete_image }: CarouselProps) {
    return (
        <div id="carouselExampleCaptions" className="rounded carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {listImages && listImages.map((image: any, index: any) => {
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
                {listImages && listImages.map((image: Image, index: any) => {
                    return (
                        <React.Fragment key={index} >
                            {index === 0 &&
                                <div className="carousel-item active" key={index} >
                                    {image && <ImgCarousel image={image} delete_image={delete_image} />}
                                </div>
                            }
                            {index !== 0 &&
                                <div className="carousel-item " key={index} >
                                    {image && <ImgCarousel image={image} delete_image={delete_image} />}
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