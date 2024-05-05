const createRequest = (options = {'url': url, 'data': data, 'method': method, 'callback': callback}) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      if(method === 'GET'){
        dataArrayGet = function requestData(data, url){
          const newArray = [url + '?']
          for(let key in data){
            newArray.push(`${key}=${data[key]}&`)
            }
          return newArray.join('').slice(0,-1)
        }
        getUrl = dataArrayGet(data, url)
        try{
          xhr.open(method, getUrll)
          xhr.send()
        }catch( error ){
          // перехват сетевой ошибки
          callback( error );
        }
      }else{
        dataArrayPost = function(data){
        formData = new FormData();
        const keys = Object.keys(data)
        const values = Object.values(data)
          for(let i=0; i < keys.length; i++){
            formData.append( keys[i], values[i] );   
    }
   return formData   
}
       try{
           xhr.open( method, url );
           xhr.send( formData );
       }catch ( error ) {
    // перехват сетевой ошибки
    callback( error );
  }
}
xhr.addEventListener('readystatechange', () => {
  if(xhr.readyState === xhr.DONE){
    callback
  }
})
}


