export default class CustomFetch {

  post(url, params, options = {}, headerOptions = {}) {

    const URLparams = new URLSearchParams();
    URLparams.append('json', JSON.stringify(params));

    const requestOptions = {
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

  postWithImagesFiles(url, params, options = {}, headerOptions = {}) {

    const requestOptions = {
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

  get(url, options = {}, headerOptions = {}) {

    const requestOptions = {
      method: 'GET',
      headers: { ...headerOptions },
      ...options
    };
    return fetch(url, requestOptions);
  }

  put(url, params, options = {}, headerOptions = {}) {

    const URLparams = new URLSearchParams();
    URLparams.append('json', JSON.stringify(params));

    const requestOptions = {
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

  delete(url, options = {}, headerOptions = {}) {

    const requestOptions = {
      method: 'DELETE',
      headers: { ...headerOptions },
      ...options
    };
    return fetch(url, requestOptions);

    return fetch(url, requestOptions);
  }

}