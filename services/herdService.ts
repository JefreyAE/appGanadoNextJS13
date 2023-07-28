
import Constants from "../helpers/constants";
import CustomFetch from "../helpers/fetching";
import Herd from "../models/herds";
import {checkAuth} from "../helpers/checkAuth";
import { handleResponse, handleDataStatus, handleError } from "./responseHelpers";
import { getCookie } from 'cookies-next';

export default class HerdService{

    private constants: Constants;
    private customFetch: CustomFetch;
    private url: string | undefined;
    private token: string | null ;

    constructor(){
        this.constants = new Constants();
        this.customFetch = new CustomFetch();
        this.url = this.constants.getUrlApi();
        this.token = `${getCookie('token')}`;       
    }

    index(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/herds/index",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    update(herd:Herd){   
        checkAuth() 
        return this.customFetch.put(this.url+"/api/herds/update",herd,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    register(herd:Herd){
        checkAuth()
        return this.customFetch.post(this.url+"/api/herds/create",herd,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    delete(id:number){
        checkAuth()
        return this.customFetch.delete(this.url+"/api/herds/delete/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    detail(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/herds/herd/detail/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }
}