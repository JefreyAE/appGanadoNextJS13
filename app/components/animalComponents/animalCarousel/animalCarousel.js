import React, {useState, useEffect}  from "react";
import Constants from "../../../helpers/constants";
import { Link } from 'react-router-dom';

const AnimalCarousel = (props)=>{

    let [contador, setContador] = useState(-1);
    const [listImages, setList] = useState([]);

    let constants = new Constants();

    const {imagesList} = props;
    //console.log(imagesList);

    useEffect(()=>{
        setList(imagesList);
    },[]);

    return(

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
            {listImages.map((image, index) => {  
                return(
                    <React.Fragment key={index} >  
                        { index === 0 &&
                            <div className="carousel-item active" key={index} >
                                <img src={constants.getUrlApi()+ '/api/animals/image/' + image.image_name} className="rounded d-block w-100 carousel-img-height"
                                    alt="s" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{image.title}</h5>
                                    <p>{image.description}</p>
                                    <Link id="btnImageDelete" className="btn btn-sm btn-outline-danger"  to={constants.getUrlApi()+'/animals/image-delete/'+image.image_name+'/'+image.animal_id} >Borrar</Link>
                                </div>
                            </div>   
                        }
                        { index !== 0 &&
                            <div className="carousel-item" key={index} >
                                <img src={constants.getUrlApi()+ '/api/animals/image/' + image.image_name} className="rounded d-block w-100 carousel-img-height"
                                    alt="s" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{image.title}</h5>
                                    <p>{image.description}</p>
                                    <Link id="btnImageDelete" className="btn btn-sm btn-outline-danger"  to={constants.getUrlApi()+'/animals/image-delete/'+image.image_name+'/'+image.animal_id} >Borrar</Link>
                                </div>
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

export default AnimalCarousel;