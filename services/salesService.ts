import Constants from "../helpers/constants";
import CustomFetch from "../helpers/fetching";
import Sales from "../models/sales";
import {checkAuth} from "../helpers/checkAuth"
import { handleDataStatus, handleError, handleResponse } from "./responseHelpers";
import { getCookie } from 'cookies-next';

export default class SalesService{
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
        return this.customFetch.get(this.url+"/api/sales/index",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    detail(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/sales/sale/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    register(sale:Sales){
        checkAuth()
        return this.customFetch.post(this.url+"/api/sales/create",sale,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    update(sale:Sales){
        checkAuth()
        return this.customFetch.put(this.url+"/api/sales/update",sale,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    delete(sale_id:number, animal_id:number){
        checkAuth()
        return this.customFetch.get(`${this.url}/api/sales/sale/delete/${sale_id}/${animal_id}`,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    findByDate(date1: string, date2: string){
        checkAuth()
        return this.customFetch.post(this.url+"/api/sales/find",{date1: date1, date2: date2},{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

}