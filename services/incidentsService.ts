import Constants from "../helpers/constants";
import CustomFetch from "../helpers/fetching";
import Incidents from "../models/incident";
import {checkAuth} from "../helpers/checkAuth"
import { handleDataStatus, handleError, handleResponse } from "./responseHelpers";
import { getCookie } from 'cookies-next';

export default class IncidentsService{
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
        return this.customFetch.get(this.url+"/api/incidents/index",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    detail(id:number){
        checkAuth()
        return this.customFetch.get(this.url+"/api/incidents/incident/"+id,{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    register(incident:Incidents){
        checkAuth()
        return this.customFetch.post(this.url+"/api/incidents/create",incident,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    update(incident:Incidents){
        checkAuth()
        return this.customFetch.put(this.url+"/api/incidents/update",incident,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    delete(incident_id:number, animal_id:number){
        checkAuth()
        return this.customFetch.delete(`${this.url}/api/incidents/incident/delete/${incident_id}/${animal_id}`,{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

    findByDate(date1: string, date2: string){
        checkAuth()
        return this.customFetch.post(this.url+"/api/incidents/find",{date1: date1, date2: date2},{},{Authorization: this.token})
        .then(handleResponse)
        .then(handleDataStatus)
        .catch(handleError);
    }

}