import Constants from "../helpers/constants";
import Axios from "../helpers/fetching";
import Purchases from "../models/purchases";

export default class PurchasesService{
    private constants: Constants;
    private axios: Axios;
    private url: string;
    private token: string | null;

    constructor(){
        this.constants = new Constants();
        this.axios = new Axios();
        this.url = this.constants.getUrlApi();
        this.token = sessionStorage.getItem("token");
    }

    index(){
        return this.axios.get(this.url+"/api/purchases/index",{headers: {Authorization: this.token}});
    }

    detail(id:number){
        return this.axios.get(this.url+"/api/purchases/purchase/"+id,{headers: {Authorization: this.token}});
    }

    register(purchase:Purchases){
        return this.axios.post(this.url+"/api/purchases/create",purchase,{headers: {Authorization: this.token}});
    }

    update(purchase:Purchases){
        return this.axios.put(this.url+"/api/purchases/update",purchase,{headers: {Authorization: this.token}});
    }

    delete(purchase_id:number, animal_id:number){
        return this.axios.delete(this.url+"/api/purchases/delete-one/",{purchase_id: purchase_id, animal_id: animal_id},{headers: {Authorization: this.token}});
    }

    findByDate(date1: string, date2: string){
        return this.axios.post(this.url+"/api/purchases/find",{date1: date1, date2: date2},{headers: {Authorization: this.token}});
    }

}