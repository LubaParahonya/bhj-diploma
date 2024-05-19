/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */



class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element){
      throw new Error('Ошибка')
    }
    this.element = element
    this.registerEvents()
    AccountsWidget.update()

  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
     const createAccount = document.querySelector('.create-account')
     createAccount.addEventListener('click', (event)=>{
      event.preventDefault()
      moApp.getModal('modal-new-account').open()
      this.element.addEventListener('click',( event)=> {
        event.preventDefault()
        AccountsWidget.onSelectAccount(this.element)

      })

     })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const UserCurrent = User.current()
    if(UserCurrent){
      Account.list(data, (err, response)=>{
        if(response && response.user){
          this.clear()
          response.data.forEach(element => {
            this.renderItem(element)
          });
        } else{
          alert(arr)
        }
      })
    }

  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
document.querySelectorAll('.accounts-panel').forEach(element => {
  element.remove()
})
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const activEl = document.querySelector('.active')
    if(activEl){
      activEl.classList.remove('.active')
    }

    element.classList.add('.active')
    App.showPage( 'transactions', { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
       return `<li class="active account" data-id="${item.id}">
       <a href="#">
           <span>${item.name}</span> /
           <span>${item.sum}</span>
       </a>
   </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    this.getAccountHTML(data)
  }
}
