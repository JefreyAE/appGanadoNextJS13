
'use client'
import { useState, useContext, useEffect } from 'react'
import '../../styles/userStyles.css'
import ProfileCard from '../../components/ProfileCard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../../../../contexts/userContext'
import UserService from '../../../../services/userService'
import ButtonsBar from '../../../components/ButtonsBar'
import PostAnimalsList from '../../components/PostsAnimalsList'
import PostsAnimalService from '../../../../services/postsAnimalService'
import User from '../../../../models/user'
import useInfiniteScrollById from '../../../../hooks/useInfinititeScrollById'
import PostImageSkeleton from '../../components/PostImageSkeleton'

interface UserProps {
    params: any
}
export default function UserProfile({ params }: UserProps) {

    const [isUpdate, setIsUpdate] = useState(true)
    const { userContext, updateUser } = useContext(UserContext)
    const [userProfile, updateUserProfile] = useState<User | null>(null)
    const _userService = new UserService()
    const [listPosts, setListPosts] = useState<any[]>([])
    const [notFound, setNotFound] = useState<boolean>(false)

    const _postService = new PostsAnimalService()

    const sectionCentral = document.getElementById('sectionCentral')
    const content = document.getElementById('content')
    const { loading, itemsList, page, last_page, fetchItems } = useInfiniteScrollById(_postService.getPostsByUserPaginated.bind(_postService), content, sectionCentral)

    useEffect(() => {
        if (params.id && !isNaN(params.id)) {
            params.id && fetchItems(params.id)
        }
    }, [])

    useEffect(() => {
        if (params.id && !isNaN(params.id)) {
            _userService.getProfile(params.id).
                then((data) => {
                    data && updateUserProfile(data.user)
                    setNotFound(false)
                })
        } else {
            setNotFound(true)
        }
    }, [isUpdate])

    const refreshAvatar = () => {
        setIsUpdate(!isUpdate)
    }
    return (
        <>
            <ButtonsBar />
            <div className="col-md-12 row justify-content-center">
                {userContext && userProfile && <ProfileCard isUserOwner={userContext.id === parseInt(params.id)} user={userProfile} refreshData={userContext.id === params.id ? refreshAvatar : () => { }} />}
                {notFound && <h1>Usuario no encontrado</h1>}
            </div>
            <div className="col-md-12 row justify-content-center mt-5">
                <PostAnimalsList posts={itemsList} />
                {loading && 
                    <>{Array.from({length:8},(_, index)=>(
                        <PostImageSkeleton key={index}/>
                    ))}
                    </>
                }
            </div>
            <ToastContainer />
        </>
    )
}