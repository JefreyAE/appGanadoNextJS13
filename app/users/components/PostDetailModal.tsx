import Link from "next/link";
import PostAnimal from "../../../models/postAnimal";
import Carousel from "../../animals/components/Carousel";
import { UserContext } from "../../../contexts/userContext";
import { useContext, useEffect, useState } from "react";

interface PostDetailModalProps {
    post: PostAnimal
    index: number
    toggleModal: (post:PostAnimal)=>void
    modalVisible: boolean
}
export default function PostDetailModal({ post, index, toggleModal, modalVisible }: PostDetailModalProps) {

    const { userContext } = useContext(UserContext)
    const [showModal, setShowModal] = useState(modalVisible)

    useEffect(()=>{
        toggleModal(post)    
    },[])
    useEffect(()=>{
        setShowModal(!showModal) 
    },[modalVisible])
    
    return (
        <>
            {showModal && <div className="modal-post" key={index}>
                <div className="modal-bars">
                    <button className="close-btn" onClick={e => setShowModal(!showModal)}><span className="fa-solid fa-xmark"></span></button>
                </div>
                {post && post.images && <Carousel indexList={index} resourceUrl="/api/posts/animals/image/" listImages={post.images} />}
                <div className="modal-bars">
                    {userContext && userContext.id === post.user_id &&
                        <Link className="edit-post-button" href={`/posts/animals/edit/${post.id}`}>Editar publicación</Link>
                    }
                </div>
            </div>
            }
        </>
    )
}