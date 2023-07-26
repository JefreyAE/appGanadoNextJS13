import Constants from "../helpers/constants";
import CustomFetch from "../helpers/fetching.js";
import { getCookie } from 'cookies-next';

export default class SessionService {
  
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

    resfreshToken(){
        return this.customFetch.get(this.url+"/api/refresh",{},{Authorization: this.token});
    }

}