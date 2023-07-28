import Constants from "../helpers/constants";
import CustomFetch from "../helpers/fetching";
import Injectables from "../models/injectable";
import {checkAuth} from "../helpers/checkAuth"
import { handleDataStatus, handleError, handleResponse } from "./responseHelpers";
import { getCookie } from 'cookies-next';

export default class InjectablesService{
    private constants: Constants;
    private customFetch: CustomFetch;
    private url: string | undefined;
    private token: string | null;

    constructor(){
        this.constants = new Constants();
        this.customFetch = new CustomFetch();
        this.url = this.constants.getUrlApi();
        this.token = `${getCookie('token')}`; 
    }

    index(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/injectables/index",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    detail(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/injectables/injectable/detail/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    register(injectable:Injectables){
        checkAuth()
        return this.customFetch.post(this.url+"/api/injectables/create",injectable,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    update(injectable:Injectables){
        checkAuth()
        return this.customFetch.put(this.url+"/api/injectables/update",injectable,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    delete(creation_time:number, animal_id:number){
        checkAuth()  
        return this.customFetch.delete(`${this.url}/api/injectables/injectable/delete/${creation_time}/${animal_id}`,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    deleteAll(creation_time:number){
        checkAuth()
        return this.customFetch.delete(`${this.url}/api/injectables/injectable/deleteAll/${creation_time}`,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    findByDate(date1: string, date2: string){
        checkAuth()
        return this.customFetch.post(this.url+"/api/injectables/find",{date1: date1, date2: date2},{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

}