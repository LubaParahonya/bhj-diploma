class AsyncForm {
  
  constructor(element) {
    if (!element) {
      throw new Error("Ошибка");
    }
    this.element = element;
    this.registerEvents();
  }

 
  registerEvents() {
    this.element.addEventListener("click", (event) => {
      event.preventDefault();
      this.submit();
    });
  }
  getData() {
    ///должан быть одна форма, а не цикл из массива форм
    const forms = Array.from(document.getElementsByTagName('form'))
    forms.forEach(elemForm => {
      const key = elemForm.querySelector('input').name
      const value = elemForm.querySelector('input').value
      const formData = new FormData(elemForm)
      entries = formData.entries()
      for(const [key, value] of entries){
        entries.push(`${key}=${value}`)
      }
      
    })
    return entries
  }

  onSubmit(options) {}
  
  submit() {
    const data = this.getData()
    this.onSubmit(data)
  }
}
