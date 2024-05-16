class User {
  
  static URL = '/user'

  static setCurrent(user) {
        localStorage.setItem('user', JSON.stringify(user))
  }

  static unsetCurrent() {
     localStorage.getItem('user')

  }

  static current() {
    return JSON.parse(localStorage.getItem('user'))
  }

  static fetch(callback) {
    createRequest({
      url: this.URL,
      method: "GET",
      data,
      callback : ( err, response ) => {
        if(response && response.user){
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.unsetCurrent(response.user);
        }
        callback(err, response);
      }
    })
  }
}
