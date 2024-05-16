

/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if(!element){
      throw new Error('Ошибка')
    }
     this.element = element
     this.registerEvents()    
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions)
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
document.querySelector('.remove-account').addEventListener('click', (event) =>{
  event.preventDefault()
  this.removeAccount()
})

document.querySelector('.transaction__remove').addEventListener('click', (event) =>{
  event.preventDefault()
  this.removeTransaction(this.element.dataset.id)
})
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
if(this.lastOptions ){
  Account.remove(data, (response, err) =>{
    if(response && response.user){
      if(confirm('Вы действительно хотите удалить счёт?') === true){
      App.updateWidgets() 
      App.updateForms()
      }
      
    }
  })
  this.clear()
}
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    Transaction.remove(data.id, (response, err)=> {
      if(response && response.user){
        if(confirm('Вы действительно хотите удалить счёт?') === true){
          App.update()
        }
       
      }
    })
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (options) {
      this.lastOptions = options;

      Account.get(options.account_id, (err, response) => {
        if (response && response.success) {
          this.renderTitle(response.data.name);
        }
      });

      Transaction.list(options, (err, response) => {
        if (response && response.success) {
          this.renderTransactions(response.data);
        }
      });
    }
  }


  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([])
    this.renderTitle(name = 'Название счёта')
    this.lastOptions = '';

  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    document.querySelector('.content-title').textContent = name

  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const page = new TransactionsPage( document.getElementById( '#content' ));
      return page.formatDate( date );
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
if(item.type === 'expense ' ||item.type === 'income' ){
  formatDate(item.created_at)
}
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = document.querySelector('.content')
    data.forEach(item => {
      content.insertAdjacentHTM('afterend', getTransactionHTML(item))
    });
    
  }
}