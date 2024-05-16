const createRequest = (
  options = { 'url': url, 'data': data, 'method': method, 'callback': callback }
) => {
  try {
    for (let [key, value] of Object.entries(options)) {
      arrKeyValue = `${JSON.stringify(key)}: ${JSON.stringify(value)}`;
    }
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    if (method === "GET") {
      const newArray = [url + "?"];
      for (let key in data) {
        newArray.push(`${key}=${data[key]}&`);
      }
      xhr.open(method, newArray);
      xhr.send();
    } else {
      formData = new FormData();
      for (let [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      xhr.open(method, url);
      xhr.send(formData);
    }
    xhr.onload = () => {
      callback(response);
    };
  } catch (error) {
    callback(error);
  }
};
