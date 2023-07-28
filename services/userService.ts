import Constants from "../helpers/constants";
import User from "../models/user";
import CustomFetch from "../helpers/fetching.js";
import { getCookie } from "cookies-next";
import { handleDataStatus, handleError, handleResponse } from "./responseHelpers";
import { checkAuth } from "../helpers/checkAuth";

export default class UserService {
    private constants = new Constants();
    private customFetch = new CustomFetch();
    private url: string | undefined;
    private token: string;

    constructor(){
        this.constants = new Constants();
        this.customFetch = new CustomFetch();
        this.url = this.constants.getUrlApi();
        this.token = `${getCookie('token')}`; 
    }

    login(email:string, password:string){     
        let user = new User(null, null, email, password, null, null, null, null, null, null);
        return this.customFetch.post(this.url+"/api/user/login", user, {method: 'post', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}})
        .then(handleResponse)
        .catch(handleError);
    }

    registerByAdmin(user:{}){  
        const token = getCookie('token');   
        return this.customFetch.post(this.url+"/api/user/registerByAdmin", user, {},{Authorization: token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    deleteByAdmin(id:number){    
        return this.customFetch.delete(`${this.url}/api/user/deleteByAdmin/${id}`,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    index(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/user/index",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    updatePassword(passwordNew:string, passwordRepeat:string, passwordCurrent:string){
        let data = {passwordNew:passwordNew, passwordRepeat:passwordRepeat, passwordCurrent: passwordCurrent}
        const token = getCookie('token');     
        return this.customFetch.put(this.url+"/api/user/update/password", data,{},{Authorization: token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    myProfile(){    
        return this.customFetch.get(this.url+"/api/user/myprofile/data",{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    getProfile(id:any){    
        return this.customFetch.get(`${this.url}/api/user/profile/${id}`,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    updateProfile(user:User){
        checkAuth()  
        return this.customFetch.put(this.url+"/api/user/update/profile",user,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    updateUser(updatedData:{}){
        checkAuth()  
        return this.customFetch.put(this.url+"/api/user/update/user",updatedData,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    uploadAvatarProfile(formData:any){
        checkAuth()
        return this.customFetch.postImage(this.url+"/api/user/upload/avatar",formData,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

}