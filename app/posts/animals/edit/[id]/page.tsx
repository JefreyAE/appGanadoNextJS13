'use client'
import React, { useEffect, useState } from "react";
import PostAnimalService from "../../../../../services/postsAnimalService";
import 'react-toastify/dist/ReactToastify.css';
import ButtonsBar from "../../../../components/ButtonsBar";
import '../../../styles/postStyles.css'
import PostAnimal from "../../../../../models/postAnimal";
import CardPostAnimals from "../../../componnets/CardPostAnimals";
import FormPostsAnimals from "../../../componnets/FormPostAnimals";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import CardPostAnimalsSkeleton from "../../../componnets/CardPostAnimalsSkeleton";

interface DetailProps {
    params: any
}
export default function Detail({ params }: DetailProps) {

    const [post, setPost] = useState<PostAnimal>()
    const _postAnimalService = new PostAnimalService()
    const [updateDetail, setUpdateDetail] = useState<boolean>(false)
    const [post_id, setPost_id] = useState<number | null>();
    const [description, setDescription] = useState<string | null>(null)
    const [price, setPrice] = useState<string | null | number>("000")
    const [isPublic, setIsPublic] = useState<number>(1)
    const [isOnSale, setIsOnSale] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<number>(0)
    const [expiration_date, setExpiration_date] = useState<string | null>('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [notFound, setNotFound] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        if (params.id && !isNaN(params.id)) {
            params.id && _postAnimalService.detail(params.id)
                .then((data) => {
                    if(data){
                        data.post && setPost(data.post)
                        data.post && setPost_id(params.id)
                        data.post && setDescription(data.post.description)
                        data.post && setIsPublic(data.post.isPublic)
                        data.post && setIsOnSale(data.post.isOnSale)
                        data.post && setIsOpen(data.post.isOpen)
                        data.post && setExpiration_date(data.post.expiration_date)
                        data.post && setPrice(data.post.price)
                    }else{
                        setNotFound(true)
                    }
                })
        }else{
            setNotFound(true)
        }
    }, [params.id, updateDetail])

    useEffect(() => {
        if(String(isOnSale) === "0" ){
            setPrice(0)
            setIsOpen(0) 
            post && setPost((prevPost) => ({
                ...prevPost!,
                isPublic,
                isOpen: 0,
                isOnSale,
                price: 0,
                expiration_date: null
            }));
        }else{
            post && setPost((prevPost) => ({
                ...prevPost!,
                isPublic,
                isOpen,
                isOnSale,
            }));
        }
    }, [isPublic, isOnSale, isOpen, description, expiration_date])


    const updatePost = (e: any) => {
        e.preventDefault();
        const loading = document.getElementById("cargando");
        if (loading != null) {
            loading.style.display = 'block';     
            const postForm = new FormData();
            postForm.append('id', `${post_id}`);
            postForm.append('price', `${price}`);
            postForm.append('description', `${description}`);
            postForm.append('isPublic', `${isPublic}`);
            postForm.append('isOnSale', `${isOnSale}`);
            postForm.append('isOpen', `${isOpen}`);
            postForm.append('expiration_date', `${expiration_date}`);

            selectedFiles.forEach((file, index) => {
                postForm.append(`files[${index}]`, file);
            });

            if (postForm != null) {
                _postAnimalService.update(postForm)
                    .finally(() => {
                        if (loading != null) {
                            loading.style.display = 'none';
                        }
                        setUpdateDetail(!updateDetail)
                        setSelectedFiles([])
                    });
            }
        }
    }

    const deletePost = (id: number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta publicación?");
        if (confirmDelete) {
            _postAnimalService.delete(id)
                .finally(() => {
                    router.push("/main")
                })
        }
    }

    const delete_image = (image_name: string, user_id:number) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta imagen?");
        if (confirmDelete) {
            _postAnimalService.deleteImage(image_name, user_id)
                .finally(() => {
                    setUpdateDetail(!updateDetail)
                })
        }
    }
     console.log(post?.isOnSale);
     
    return (
        <>
            <ButtonsBar />
            {post ? 
                <div key={1}>
                    <CardPostAnimals key={1} post={post} deletePost={deletePost} delete_image={delete_image} index={1} />
                </div> :
                <CardPostAnimalsSkeleton/>
            }
            {post && 
                <section className="frontend row justify-content-center">
                    <div className="form col-lg-8" >
                    <h1 className="titulo col-md-12">Actualizar publicación</h1>
                        {post && <FormPostsAnimals
                            entity={post}
                            buttonValue="Actualizar"
                            formFn={updatePost}
                            selectedFiles={selectedFiles}
                            isOnSale={isOnSale}
                            isPublic={isPublic}
                            isOpen={isOpen}
                            setSelectedFiles={setSelectedFiles}
                            setDescription={setDescription}
                            setIsOnSale={setIsOnSale}
                            setIsPublic={setIsPublic}
                            setIsOpen={setIsOpen}
                            setPrice={setPrice}
                            setExpiration_date={setExpiration_date}
                        />}
                    </div>
                </section>
            }
            {notFound && <div className="row justify-content-center"><h1>Usuario no encontrado</h1></div>}
            <ToastContainer />
        </>
    );
}