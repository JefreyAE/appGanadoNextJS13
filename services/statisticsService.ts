
import Constants from "../helpers/constants";
import CustomFetch from "../helpers/fetching";
import {checkAuth} from "../helpers/checkAuth";
import { handleResponse, handleError } from "./responseHelpers";
import { getCookie } from 'cookies-next';

export default class AnimalService{

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
        return this.customFetch.get(this.url+"/api/statistics/index",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }

    auctionsPrices(){
        checkAuth()
        return this.customFetch.get(this.url+"/api/statistics/auctions",{},{Authorization: this.token})
        .then(handleResponse)
        .catch(handleError);
    }
}