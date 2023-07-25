
export default class CustomFetch{

    post(url, params, options={}, headerOptions={}){

        let URLparams = new URLSearchParams();
        URLparams.append('json', JSON.stringify(params));

        let requestOptions = {    
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headerOptions
          },
          ...options,
          body: URLparams
        };
        return fetch(url, requestOptions);
    }

    postImage(url, params, options={}, headerOptions={}){

      let requestOptions = {    
        method: 'POST',
        mode: 'cors',
        headers: {
          ...headerOptions
        },
        ...options,
        body: params
      };
    
      return fetch(url, requestOptions);
  }

    get(url, options={}, headerOptions={}){

        let requestOptions = {    
          method: 'GET',
          mode: 'cors',
          headers: {...headerOptions},
          ...options
        };
        return fetch(url, requestOptions);
    }

    put(url, params, options={}, headerOptions={}){

        let URLparams = new URLSearchParams();
        URLparams.append('json', JSON.stringify(params));
            
        let requestOptions = {    
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headerOptions
          },
          ...options,
          body: URLparams
        };

        return fetch(url, requestOptions);
    }

    delete(url, params, options={}, headerOptions={}){

      let URLparams = new URLSearchParams();
      URLparams.append('json', JSON.stringify(params));
          
      let requestOptions = {    
        method: 'DELETE',
        mode: 'cors',
        headers: {  
          ...headerOptions
        },
        ...options,
        body: URLparams
      };
    
      return fetch(url, requestOptions);
  }

}