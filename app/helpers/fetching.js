
export default class Axios{

    post(url, params, options){

        let URLparams = new URLSearchParams();
        URLparams.append('json', JSON.stringify(params));
            
        let requestOptions = {    
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          ...options,
          body: URLparams
        };
      
        return fetch(url, requestOptions);
    }

    get(url, options){
       
        let requestOptions = {    
          method: 'GET',
          mode: 'cors',
          ...options
        };
      
        return fetch(url, requestOptions);
    }

    put(url, params, options){

        let URLparams = new URLSearchParams();
        URLparams.append('json', JSON.stringify(params));
            
        let requestOptions = {    
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          ...options,
          body: URLparams
        };

        return fetch(url, requestOptions);
    }

    delete(url, params, options){

      let URLparams = new URLSearchParams();
      URLparams.append('json', JSON.stringify(params));
          
      let requestOptions = {    
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        ...options,
        body: URLparams
      };
    
      return fetch(url, requestOptions);
  }

}