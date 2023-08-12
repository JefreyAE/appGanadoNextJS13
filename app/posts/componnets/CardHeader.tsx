
import React, { useContext} from "react";
import 'react-toastify/dist/ReactToastify.css';
import ActionsTab from "./ActionsTap";
import Constants from "../../../helpers/constants";
import Link from "next/link";
import '../styles/postStyles.css'
import PostAnimal from "../../../models/postAnimal";
import {getTimeElapsed} from "../../../helpers/datesFormats"

interface CardHeaderProps {
    post: PostAnimal
    deletePost?: (id: number) => void
}

export default function CardHeader({ post, deletePost }: CardHeaderProps) {

    const constants = new Constants()
    
    return (
        <>
            {post.user && 
                <div className="header">
                    <span>
                        <Link className="header-link" href={'/users/user/' + post.user.id}>
                            {post.user.avatar ?
                                <img id="img-logo" src={constants.getUrlApi() + '/api/user/image/' + post.user.avatar} alt="" />
                                :
                                <img id="img-logo" src="/images/logoUser.jpg" alt="" />
                            }
                            <span className="ml-1">{post.user.name} </span> - <span className="elapsed-time">{getTimeElapsed(post.created_at || '')}</span>
                        </Link>
                    </span>
                    <ActionsTab entity={post} deleteEntityFn={deletePost} />
                </div>   
            }        
        </>
    );
}