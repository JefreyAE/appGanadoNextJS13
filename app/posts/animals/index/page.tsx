'use client'
import React, { useEffect, useState } from "react";
import PostAnimalService from "../../../../services/postsAnimalService";
import 'react-toastify/dist/ReactToastify.css';
import ButtonsBar from "../../../components/ButtonsBar";
import '../../styles/postStyles.css'
import CardPostAnimals from "../../componnets/CardPostAnimals";
import CardPostAnimalsSkeleton from "../../componnets/CardPostAnimalsSkeleton";
import { ToastContainer } from "react-toastify";
import useInfiniteScroll from "../../../../hooks/useInfinititeScroll";
import PostDetailModal from "../../../users/components/PostDetailModal";
import PostAnimal from "../../../../models/postAnimal";

export default function Index() {

    const _postService = new PostAnimalService()
    const [updateIndex, setUpdateIndex] = useState<boolean>(false)

    const sectionCentral = document.getElementById('sectionCentral')
    const content = document.getElementById('content')
    const {loading, itemsList, page, last_page, fetchItems} = useInfiniteScroll(_postService.index, content, sectionCentral)

    const [modalVisible, setModalVisible] = useState(false)
    const [selectePost, setSelectedPost] = useState<PostAnimal | null>(null)

    const toggleModal = (post:PostAnimal)=>{
        setSelectedPost(post)
        setModalVisible(!modalVisible)
    }

    const deletePost = (id: number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta publicación?");

        if (confirmDelete) {
            _postService.delete(id)
                .finally(() => {
                    setUpdateIndex(!updateIndex)
                })
        }
    }

    useEffect(()=>{
        fetchItems()
    },[])
    
    return (
        <>
            <ButtonsBar />
            {itemsList && itemsList.map((post, index) => {
                return (
                    <div key={index}>
                        <CardPostAnimals toggleModal={toggleModal} key={index} post={post} deletePost={deletePost} index={index} />
                    </div>
                )
            })}
            {loading && <><CardPostAnimalsSkeleton key={page} /><CardPostAnimalsSkeleton key={page+1} /></>}
            {selectePost && 
                <PostDetailModal 
                    post={selectePost} 
                    index={100000} 
                    toggleModal={toggleModal}
                    modalVisible={modalVisible}
            />}
            <ToastContainer />
        </>
    );
}