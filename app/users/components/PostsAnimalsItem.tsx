
import Constants from "../../../helpers/constants";
import PostAnimal from "../../../models/postAnimal"
import LikeButton from "../../posts/componnets/LikeButton";

interface PostAnimalsListProps {
    post: PostAnimal
    toggleModal:(post:PostAnimal)=>void
}
export default function PostAnimalsItem({ post, toggleModal }: PostAnimalsListProps) {
    const constants = new Constants();
    return (
            <div className="image-post-container">
                {post.images &&
                    <img onClick={() => toggleModal(post)} src={`${constants.getUrlApi()}/api/posts/animals/image/${post.images[0].image_name}/${post.user_id}`} className="" alt="Imagen de publicación" />
                }
                <div className="likeButton-container">
                    {post.user_id && post.id && 
                        <LikeButton user_id={post.user_id} post_id={post.id} />
                    }
                </div>
            </div>
    )
}
