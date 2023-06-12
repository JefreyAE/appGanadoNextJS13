
import Constants from "../helpers/constants";
import Axios from "../helpers/fetching";
import Animal from "../models/animal";

export default class AnimalService{

    private constants = new Constants();
    private axios = new Axios();
    private url = this.constants.getUrlApi();
    private token = sessionStorage.getItem("token");

    index(){
        return this.axios.get(this.url+"/api/animals/index",{headers: {Authorization: this.token}});
    }

    indexAll(){
        return this.axios.get(this.url+"/api/animals/indexAll",{headers: {Authorization: this.token}});
    }

    update(animal:Animal){    
        return this.axios.put(this.url+"/api/animals/update",animal,{headers: {Authorization: this.token}});
    }

    register(animal:Animal){
        return this.axios.post(this.url+"/api/animals/create",animal,{headers: {Authorization: this.token}});
    }

    delete(id:number){
        return this.axios.get(this.url+"/api/animals/delete/"+id,{headers: {Authorization: this.token}});
    }

    create(){
        return this.axios.post(this.url+"/api/animals/index",{},{headers: {Authorization: this.token}});
    }

    dead(){
        return this.axios.get(this.url+"/api/animals/dead",{headers: {Authorization: this.token}});
    }

    detail(id:number){
        return this.axios.get(this.url+"/api/animals/animal/detail/"+id,{headers: {Authorization: this.token}});
    }

    getImages(id:number){
        return this.axios.get(this.url+"/api/animals/images_names/"+id,{headers: {Authorization: this.token}});
    }

    uploadImage(formData:any){

        return this.axios.post({
            method: 'post',
            url: this.url+"/api/animals/upload",
            data: formData,
            headers: {'Content-Type': 'multipart/form-data', Authorization: this.token}
            });

       // return this.axios.post(url+"/api/animals/upload",formData,{headers: {Authorization: token, 'Content-Type': 'multipart/form-data' }});
    }

}