export default class Constants {
 
    urlApi = "";
    constructor(){
        this.urlApi = "http://localhost/back-appGanado/public"
        //this.urlApi = "https://erpsolutionscr.com/apirestlaravel/public";
    }
    

    getUrlApi(){     
        return this.urlApi;
    }
}