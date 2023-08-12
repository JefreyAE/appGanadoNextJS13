
import Constants from "../helpers/constants";
import CustomFetch from "../helpers/fetching";
import {checkAuth} from "../helpers/checkAuth";
import { handleResponse, handleDataStatus, handleError } from "./responseHelpers";
import { getCookie } from 'cookies-next';

export default class PostsAnimalService{

    private constants: Constants;
    private customFetch: CustomFetch;
    private url: string  | undefined;
    private token: string | null ;

    constructor(){
        this.constants = new Constants();
        this.customFetch = new CustomFetch();
        this.url = this.constants.getUrlApi();
        this.token = `${getCookie('token')}`;       
    }

    index = (page: number) => {
        checkAuth();
        return this.customFetch.get(`${this.url}/api/posts/animals/index/${page}`, {}, { Authorization: this.token })
            .then(handleResponse)
            .catch(handleError);
    }
    register(formData:any){
        checkAuth()
        return this.customFetch.postWithImagesFiles(this.url+"/api/posts/animals/create",formData,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }
    delete(id:number){
        checkAuth()
        return this.customFetch.delete(this.url+"/api/posts/animals/delete/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }
    detail(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/posts/animals/post/detail/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }
    update(formData:any){
        checkAuth()
        return this.customFetch.postWithImagesFiles(this.url+"/api/posts/animals/update",formData,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }
    uploadImage(formData:any){
        checkAuth()
        return this.customFetch.postWithImagesFiles(this.url+"/api/animals/upload",formData,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }
    getPostsByUser(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/posts/animals/user/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    getPostsByUserPaginated(user_id:number, page:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/posts/animals/user/"+user_id+"/"+page,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    deleteImage(image_name:string,user_id:number){
        checkAuth()
        return this.customFetch.delete(`${this.url}/api/posts/animals/deleteImage/${image_name}/${user_id}`,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    postsLikes(user_id:number, post_id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/posts/animals/like/"+user_id+"/"+post_id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    toggleLike(user_id:number, post_id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/posts/animals/togglelike/"+user_id+"/"+post_id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

}