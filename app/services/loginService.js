import Constants from "../helpers/constants";
import User from "../models/user";
import Axios from "../helpers/fetching.js";


export default class LoginService {

    constants = new Constants();
    axios = new Axios();

    constructor() {

    }

    login(name, email, password){
        let user = new User(name, email, password);

        let url =  this.constants.getUrlApi();

        return this.axios.post(url+"/api/user/login", user, {method: 'post', mode: 'cors', headers: {'Content-Type':'application/x-www-form-urlencoded'}}); 
    }

}