import Link from "next/link";

export default function ImgCarousel(props) {
    return (
        <>
            <img src={props.apiUrl + '/api/animals/image/' + props.image.image_name} className="rounded d-block w-100 carousel-img-height" alt="s" />
            <div className="carousel-caption d-none d-md-block">
                <h5>{ props.image.title}</h5>
                <p>{ props.image.description}</p>
                <Link id="btnImageDelete" className="btn btn-sm btn-outline-danger"  href={props.apiUrl +'/animals/image-delete/'+  props.image.image_name+'/'+ props.image.animal_id} >Borrar</Link>
            </div>
        </>
    )
}