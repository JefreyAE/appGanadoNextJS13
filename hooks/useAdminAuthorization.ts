'use Client'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { useRouter } from 'next/navigation';

export default function useAdminAuthorization(redirect:boolean=false){

    const {userContext} = useContext(UserContext)
    const router = useRouter()

    const [isAuthorize, setIsAuthorize] = useState(false)
    useEffect(()=>{ 
        setIsAuthorize(userContext.role === '1')
        if(userContext.role !== '1' && redirect){
            router.push('/main')
        }
    },[])

    return{
        isAuthorize
    }

}