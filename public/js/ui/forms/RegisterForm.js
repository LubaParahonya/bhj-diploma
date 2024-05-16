class RegisterForm extends AsyncForm {
 
  onSubmit(data) {
    User.register(data, (err, response)=>{
      if(response && response.use){
        form.reset()
        App.setState( 'user-logged')
        const userLogged =  App.getModal('user-logged')
        userLogged.open()
      }
    })
    callback(err);
  }
}