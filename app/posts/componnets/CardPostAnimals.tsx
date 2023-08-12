
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Carousel from "../../animals/components/Carousel";
import '../styles/postStyles.css'
import PostAnimal from "../../../models/postAnimal";
import CardHeader from "./CardHeader";
import LikeButton from "./LikeButton";

interface CardPostAnimalsProps {
    post: PostAnimal
    deletePost?: (id: number) => void
    delete_image?: (image_name: string, user_id: number) => void
    index?: number
    toggleModal?: (post:PostAnimal)=>void
}

export default function CardPostAnimals({ post, deletePost, delete_image, toggleModal, index }: CardPostAnimalsProps) {

    const offersData = [
        {
            id: 1,
            title: "Oferta 1",
            description: "Esta es la primera oferta",
            price: 100,
        },
        {
            id: 2,
            title: "Oferta 2",
            description: "Esta es la segunda oferta",
            price: 150,
        },
        {
            id: 3,
            title: "Oferta 3",
            description: "Esta es la tercera oferta",
            price: 200,
        },
    ];
    
    return (
        <>
            {post.user && 
                <div className="card" key={index}>
                    <CardHeader post={post} deletePost={deletePost}/>
                    {post && post.images && <Carousel post={post} toggleModal={toggleModal} indexList={index} resourceUrl="/api/posts/animals/image/" delete_image={delete_image} listImages={post.images} />}
                    <div className="actions-bar">
                        {post.user_id && post.id && <LikeButton user_id={post.user_id} post_id={post.id}/>}
                        {(post.price && (post.price > 0)) ? <span>{`Precio base: ${post.price}`}</span> : null}
                        <button><i className=""></i></button>
                    </div>
                    {String(post.isOnSale) === '1' && <div className="card-info">
                        {String(post.isOnSale) === '1' ? <div className="onSale"><i className="fa-solid fa-scale-balanced"><label>En venta</label></i></div> :
                        <></>}
                    </div>}
                    {post.description && <div className="description">
                        <span>{post.description}</span>
                    </div>}
                    {/* <><OffertsSection offers={offersData} /></> */}
                </div>
            }
        </>
    );
}