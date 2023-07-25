export default class Constants {
 
    urlApi:string | undefined = "";
    tokenExpirationTime:number | undefined = 0;
    
    constructor(){
        this.urlApi = process.env.NEXT_PUBLIC_API_URL;
        //this.urlApi = "https://erpsolutionscr.com/apirestlaravel/public";
        this.tokenExpirationTime = parseInt(process.env.NEXT_PUBLIC_EXPIRATION_TIME || "0");
    }  
    

    getUrlApi(){     
        return this.urlApi;
    }

    getTokenExpirationTime(){
        return this.tokenExpirationTime;
    }
}