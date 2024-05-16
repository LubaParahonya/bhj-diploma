/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(data, (response, err)=> {
      if(response && response.user){
        const accountsList = document.getElementById('expense-accounts-list')
        data.forEach(item => {{accountsList.insertAdjacentHTML('beforeBegin', `<option value="${item.id}">${item.name}</option`)}      
        });
      }
    })


  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    //НЕ ДОПИСАЛА
    Transaction.create(data, (response, err)=> {
      if(response && response.user){
        form.reset()
      }
    })
  }
}