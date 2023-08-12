'use client'
import { useState } from "react";
import PostAnimal from "../../../models/postAnimal"
import PostDetailModal from "./PostDetailModal";
import PostAnimalsItem from "./PostsAnimalsItem";

interface PostAnimalsListProps {
    posts: PostAnimal[]
}
export default function PostAnimalsList({ posts }: PostAnimalsListProps) {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectePost, setSelectedPost] = useState<PostAnimal | null>(null)

    const toggleModal = (post:PostAnimal)=>{
        setSelectedPost(post)
        setModalVisible(!modalVisible)
    }
    return (
        <>
            <div className="profile-images-container">
                {posts && posts.map((post: PostAnimal, index: number) => (
                    <PostAnimalsItem key={index} post={post} toggleModal={toggleModal}/>   
                ))}
            </div>
            {selectePost && 
                <PostDetailModal 
                    post={selectePost} 
                    index={1} 
                    toggleModal={toggleModal}
                    modalVisible={modalVisible}
            />}
        </>
    )
}
