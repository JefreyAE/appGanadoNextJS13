import { useContext, useEffect, useState } from "react"
import PostsAnimalService from "../../../services/postsAnimalService"
import { UserContext } from "../../../contexts/userContext"

interface LikeButtonProps{
    user_id:number
    post_id:number
}
export default function LikeButton({user_id, post_id}:LikeButtonProps){

    const _postService = new PostsAnimalService()
    const [likesCount, setLikesCount] = useState(0)
    const [likeUser, setLikeUser] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const {userContext} = useContext(UserContext)

    useEffect(()=>{
        fetchData(user_id, post_id)
    },[user_id, post_id, refresh])

    const fetchData = (user_id:number, post_id:number)=>{
        userContext.id && _postService.postsLikes(userContext.id, post_id)
            .then(data =>{
                data && setLikesCount(data.likesCount)
                data && setLikeUser(data.likeUser)
            })
    }

    const toggleLike = ()=>{
        userContext.id && _postService.toggleLike(userContext.id, post_id)
            .then(data =>{
                data && setRefresh(!refresh)   
            })
    }
    
    return(
        <button className="like-button" onClick={toggleLike}>
            <i className="fa-solid fa-hat-cowboy-side" style={likeUser ? { color: "#aa0000" } : { color: "gray" }}></i>
            <span className="like-counter ml-1">{likesCount}</span>
        </button>
    )
}