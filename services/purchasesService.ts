import Constants from "../helpers/constants";
import CustomFetch from "../helpers/fetching";
import Purchases from "../models/purchases";
import {checkAuth} from "../helpers/checkAuth"
import { handleDataStatus, handleError, handleResponse } from "./responseHelpers";
import { getCookie } from 'cookies-next';

export default class PurchasesService{
    private constants: Constants;
    private customFetch: CustomFetch;
    private url: string;
    private token: string | null;

    constructor(){
        this.constants = new Constants();
        this.customFetch = new CustomFetch();
        this.url = this.constants.getUrlApi();
        this.token = `${getCookie('token')}`; 
    }

    index(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/purchases/index",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    detail(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/purchases/purchase/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    register(purchase:Purchases){
        checkAuth()
        return this.customFetch.post(this.url+"/api/purchases/create",purchase,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    update(purchase:Purchases){
        checkAuth()
        return this.customFetch.put(this.url+"/api/purchases/update",purchase,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    delete(purchase_id:number, animal_id:number){
        checkAuth()
        return this.customFetch.get(`${this.url}/api/purchases/purchase/delete/${purchase_id}/${animal_id}`,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    findByDate(date1: string, date2: string){
        checkAuth()
        return this.customFetch.post(this.url+"/api/purchases/find",{date1: date1, date2: date2},{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

}