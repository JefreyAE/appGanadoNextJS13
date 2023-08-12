
import Constants from '../../../helpers/constants'
import User from '../../../models/user'
import '../styles/userStyles.css'
import Link from 'next/link'
import UploadPicture from './UploadPicture'
import UserService from '../../../services/userService'

interface ProfileProps {
    user: User
    isUserOwner: boolean
    refreshData?: ()=>void
}

export default function ProfileCard({ isUserOwner, user, refreshData }: ProfileProps) {

    const _userService = new UserService()
    let constants = new Constants();

    return (
        <section id="profile-central" className='col-md-10 justify-content-center'>
            <div className='user-data-container'>
                <div className="profile-header">
                    {user && user.avatar ?
                        <img src={constants.getUrlApi() + '/api/user/image/' + user.avatar} className="profile-avatar" />
                        :
                        <img src="/images/logoUser.jpg" alt="Avatar" className="profile-avatar" />
                    }
                </div>
                <div className="profile-contact">
                    <h1>{user && user.name}</h1>
                    <h3>Información de contacto</h3>
                    <ul className='ml-3'>
                        {isUserOwner && <li>Correo de la cuenta: {user && user.email}</li>}
                        <li>Correo de contacto: {user && user.contact_email}</li>
                        <li>Telêfono: {user && user.phone_number}</li>
                    </ul>
                </div>
            </div>
            <div className='profile-btn-container'>
                {isUserOwner && <UploadPicture className='mb-3 profile-avatar-btn ' fnUploadPicture={_userService.uploadAvatarProfile.bind(_userService)} refreshData={refreshData} />}
            </div>    
            {isUserOwner &&
                <div className="edit-profile">
                    <Link href="/users/editProfile" className="edit-profile-button">Editar perfil</Link>
                </div> 
            }
        </section>
    )
}