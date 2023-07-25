

import Constants from "../helpers/constants";
import CustomFetch from "../helpers/fetching";
import {checkAuth} from "../helpers/checkAuth"
import { handleError, handleResponse } from "./responseHelpers";
import { getCookie } from 'cookies-next';

export default class NotificationsService{
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
        return this.customFetch.get(this.url+"/api/notifications/index",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    generateNotifications(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/notifications/generate",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    indexAll(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/notifications/indexAll",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    checked(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/notifications/checked",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    checkNotification(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/notifications/state/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }
}