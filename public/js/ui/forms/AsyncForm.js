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
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }

  onSubmit(options) {}
  
  submit() {
    const data = this.getData()
    this.onSubmit(data)
  }
}
