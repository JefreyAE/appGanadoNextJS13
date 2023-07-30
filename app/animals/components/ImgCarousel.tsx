import Constants from "../../../helpers/constants";
import { Image } from "../../../types/types";

interface ImgCarouselProps{
    image: Image
    delete_image?: (image_name:string, animal_id: number, user_id: number)=>void
} 
export default function ImgCarousel({image, delete_image}: ImgCarouselProps) {
    let constants = new Constants();

    return (
        <>
            <img src={`${constants.getUrlApi()}/api/animals/image/${image.image_name}/${image.user_id}`} className="rounded d-block w-100 carousel-img-height" alt="s" />
            <div className="carousel-caption d-none d-md-block">
                <h5>{ image.title}</h5>
                <p>{ image.description}</p>
                { delete_image && <button id="btnImageDelete" className="btn btn-sm btn-outline-danger" onClick={(e)=>{delete_image( image.image_name,  image.animal_id, image.user_id)}} >Borrar</button>}
            </div>
        </>
    )
}