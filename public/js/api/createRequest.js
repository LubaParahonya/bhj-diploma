const createRequest = (options = { }) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    const formData = new FormData();
    let url = options.url
    if (method === "GET") {
      const newArray = [options.url + "?"];
      for (let key in options.data) {
        newArray.push(`${key}=${options.data[key]}&`);     
      }
      url = newArray.join('').slice(0, -1)
    } else {
      for (let [key, value] of Object.entries(options.data)) {
        formData.append(key, value);
      }
    }
    try {
      xhr.open(options.method, url);
      xhr.send(formData);
    } catch (err) {
      options.callback(err);
    }
  
    xhr.addEventListener('load', () => {options.callback(null, xhr.response)});
    xhr.addEventListener('error', () => {options.callback(xhr.statusText, null)});
  
};
