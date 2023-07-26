
import Constants from "../helpers/constants";
import CustomFetch from "../helpers/fetching";
import Animal from "../models/animal";
import {checkAuth} from "../helpers/checkAuth";
import { handleResponse, handleDataStatus, handleError } from "./responseHelpers";
import { getCookie } from 'cookies-next';

export default class AnimalService{

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

    index(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/animals/index",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    indexAll(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/animals/indexAll",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    update(animal:Animal){   
        checkAuth() 
        return this.customFetch.put(this.url+"/api/animals/update",animal,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    register(animal:Animal){
        checkAuth()
        return this.customFetch.post(this.url+"/api/animals/create",animal,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    delete(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/animals/delete/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    dead(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/animals/dead",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    detail(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/animals/animal/detail/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    getImages(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/animals/images_names/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    deleteImage(image_name:string,animal_id:number,user_id:number){
        checkAuth()
        return this.customFetch.get(`${this.url}/api/animals/deleteImage/${image_name}/${animal_id}/${user_id}`,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    uploadImage(formData:any){
        checkAuth()
        return this.customFetch.postImage(this.url+"/api/animals/upload",formData,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    find(search_type:string, find_string:string){
        checkAuth()
        return this.customFetch.post(this.url+"/api/animals/find",{search_type:search_type, find_string:find_string},{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }
}