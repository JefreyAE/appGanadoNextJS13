
'use client'
import { useState, useContext, useEffect } from 'react'
import '../styles/userStyles.css'
import ProfileCard from '../components/ProfileCard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../../../contexts/userContext'
import UserService from '../../../services/userService'

export default function Profile(){

    const [isUpdate, setIsUpdate] = useState(true)
    const { userContext, updateUser } = useContext(UserContext)
    const _userService = new UserService()

    useEffect(() => {
        _userService.myProfile().
            then((data) => {
                updateUser(data.user)
            })
    }, [isUpdate])

    const refreshAvatar = ()=>{
        setIsUpdate(isUpdate ? false : true)
    }
    return (
        <div className="col-md-12 row justify-content-center">
           {userContext && <ProfileCard isUserOwner={true} user={userContext} refreshData={refreshAvatar} />}
           <ToastContainer />
        </div>
    )
}