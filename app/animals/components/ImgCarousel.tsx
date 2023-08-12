import Constants from "../../../helpers/constants";
import PostAnimal from "../../../models/postAnimal";
import { Image } from "../../../types/types";

interface ImgCarouselProps{
    image: Image
    delete_image?: (image_name:string, user_id: number)=>void
    resourceUrl: string
    toggleModal?: (post:PostAnimal) => void
    entity:any
} 
export default function ImgCarousel({image, delete_image, resourceUrl, toggleModal, entity}: ImgCarouselProps) {
    const constants = new Constants();
    return (
        <>
            <img onClick={() => toggleModal && toggleModal(entity)} src={`${constants.getUrlApi()}${resourceUrl}${image.image_name}/${image.user_id}`} className="rounded d-block w-100 carousel-img-height" alt="s" />
            <div className="carousel-caption d-none d-md-block">
                <h5>{ image.title}</h5>
                <p>{ image.description}</p>
                { delete_image && <button id="btnImageDelete" className="btn btn-sm btn-outline-danger" onClick={(e)=>{delete_image( image.image_name, image.user_id)}} >Borrar</button>}
            </div>
        </>
    )
}