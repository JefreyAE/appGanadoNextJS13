
'use client'
import { useState, useContext, useEffect } from 'react'
import '../../../styles/userStyles.css'
import ProfileCard from '../../../components/ProfileCard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from '../../../../../contexts/userContext'
import UserService from '../../../../../services/userService'
import User from '../../../../../models/user'
import InputSelect from '../../../../components/formComponents/InputSelect'
import { ROLES, userStates } from '../../../../../helpers/enums'
import { useRouter } from 'next/navigation'
import useAdminAuthorization from '../../../../../hooks/useAdminAuthorization'

type OptionObject = {
    value: string | null | number
    description: string | null
}

interface UserProfileProps {
    params: any
}
export default function UserProfileAdmin({ params }: UserProfileProps) {

    const router = useRouter()

    const [isUpdate, setIsUpdate] = useState(true)
    const { userContext } = useContext(UserContext)
    useAdminAuthorization(true)
    const _userService = new UserService()
    const [ user, setUser ] = useState<User>()

    const [state, setState] = useState()
    const [role, setRole] = useState()

    useEffect(() => {
        _userService.getProfile(params.id).
            then((data) => { 
                if(userContext.role !== '1'){
                    toast.error("No cuenta con permisos suficientes para realizar esta acción", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                    });
                    router.push('/main')
                }
                setUser(data.user)
                setState(data.user.state)
                setRole(data.user.role)
            })
    }, [params.id, isUpdate])

    const refreshAvatar = () => {
        setIsUpdate(isUpdate ? false : true)
    }

    const update = (e: React.FormEvent) => {
        e.preventDefault()
        const updatedData = {id: user?.id, state: state, role: role}
        _userService.updateUser(updatedData)    
    }

    const stateOptions: OptionObject[] = [
        { value: '1', description: userStates['1'] },
        { value: '2', description: userStates['2'] },
        { value: '3', description: userStates['3'] },
        { value: '4', description: userStates['4'] },
    ]

    const roleOptions: OptionObject[] = [
        { value: '1', description: ROLES['1'] },
        { value: '2', description: ROLES['2'] },
        { value: '3', description: ROLES['3'] },
    ]

    return (
        <div className="col-md-12 row justify-content-center">
            {user && <ProfileCard isUserOwner={user.id === userContext.id} user={user} />}
            {user && <div className="col-md-12 row justify-content-center">
                <section className="frontend row justify-content-center col-md-8">
                    <h1 className="titulo col-md-12">Actualización de datos de la cuenta</h1>
                    <div className="form col-md-10" id='formUpdateUser'>
                        <form onSubmit={update} autoComplete="nope" className="form_data mt-2">
                            <InputSelect
                                title="Estado de la cuenta"
                                setData={setState}
                                name="state"
                                entity={user}
                                options={stateOptions}
                                defaultValue={user.state}
                            />
                            <InputSelect
                                title="Role del usuario &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                setData={setRole}
                                name="state"
                                entity={user}
                                options={roleOptions}
                                defaultValue={user.role}
                            />
                            <button type="submit" className="large green button-login mt-3 mb-3" id="btnLogin" >Actualizar datos</button>
                        </form>
                    </div>
                </section>
            </div>
            }
            <ToastContainer />
        </div>
    )
}