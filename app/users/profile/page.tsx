
'use client'
import { useState, useContext, useEffect } from 'react'
import '../styles/userStyles.css'
import ProfileCard from '../components/ProfileCard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../../../contexts/userContext'
import UserService from '../../../services/userService'
import ButtonsBar from '../../components/ButtonsBar'
import PostAnimalsList from '../components/PostsAnimalsList'
import PostsAnimalService from '../../../services/postsAnimalService'
import SpinnerLoading from '../../components/SpinnerLoading'

export default function Profile(){

    const [isUpdate, setIsUpdate] = useState(true)
    const { userContext, updateUser } = useContext(UserContext)
    const [listPosts, setListPosts] = useState<any[]>([])
    const _userService = new UserService()
    const _postService = new PostsAnimalService()

    useEffect(() => {
        _userService.myProfile().
            then((data) => {
                updateUser(data.user)
            })
    }, [isUpdate])

    useEffect(() => {
        userContext.id && _postService.getPostsByUser(userContext.id )
                .then((data) => {
                    data && setListPosts(data.posts)
                })
    }, [])

    const refreshAvatar = ()=>{
        setIsUpdate(!isUpdate)
    }
    return (
        <>
            <ButtonsBar />
            <div className="col-md-12 row justify-content-center">
                {userContext && <ProfileCard isUserOwner={true} user={userContext} refreshData={refreshAvatar} />}
            </div>
            <div className="col-sm-12 row justify-content-center mt-5">
               {listPosts ? <PostAnimalsList posts={listPosts} /> : <SpinnerLoading/>}
            </div>
            <ToastContainer />
        </>
    )
}