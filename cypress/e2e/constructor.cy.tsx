describe('проверяем функциональность приложения', () => {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as(`${'getIngredients'}`);

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'userResponse.json'
    }).as(`${'getUser'}`);

    cy.setCookie('accessToken', 'mockAccessToken');
    window.localStorage.setItem('refreshToken', 'mockReshToken');

    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.setCookie('accessToken', '');
    window.localStorage.setItem('refreshToken', '');
  });

  describe('проверка загрузки моковых данных', () => {
    it('моковые данные подгружаются', function () {
      cy.wait(['@getIngredients']);
    });
  });

  describe('Тестирование работы модальных окон', () => {
    it('модальное окно ингредиента открывается', () => {
      const ingredient = cy.contains('Краторная булка N-200i');

      ingredient.click();

      // проверяем, что модалка открыта
      cy.contains('Детали ингридиента').should('exist');
    });

    it('модальное окно ингредиента закрывается по клику на крестик', () => {
      const ingredient = cy.contains('Краторная булка N-200i');
      ingredient.click();

      const closeButton = cy.get(`[data-cy="Детали ингридиента"]`);
      closeButton.click();

      // проверем, что модалка закрыта
      cy.contains('Детали ингридиента').should('not.exist');
    });

    it('модальное окно ингредиента закрывается по клику на оверлей', () => {
      const ingredient = cy.contains('Краторная булка N-200i');
      ingredient.click();

      cy.contains('Детали ингридиента').should('exist');

      cy.get('body').type('{esc}');

      cy.contains('Детали ингридиента').should('not.exist');
    });
  });

  describe('добавление ингредиентов из списка в конструктор', () => {
    it('булка добавляется в конструктор', () => {
      const bunsList = cy.get('h3').contains('Булки').next('ul');
      const bunsAddButton = bunsList.contains('Добавить');

      cy.get('div').contains('Выберите булки').should('exist');

      bunsAddButton.click();

      cy.get('div').contains('Выберите булки').should('not.exist');
    });

    it('ингредиент добавляется в конструктор', () => {
      const mainsList = cy.get('h3').contains('Начинки').next('ul');
      const mainsAddButton = mainsList.contains('Добавить');

      cy.get('div').contains('Выберите начинку').should('exist');

      mainsAddButton.click();

      cy.get('div').contains('Выберите начинку').should('not.exist');
    });
  });

  describe('оформление заказа', () => {
    it('проверка пользователя с моковыми данными', () => {
      // cy.contains('John Smith').should('not.exist');

      // cy.intercept('GET', 'api/auth/user', {
      //   fixture: 'userResponse.json'
      // }).as(`${'getUser'}`);

      // cy.wait(['@getUser']);

      cy.contains('John Smith').should('exist');
    });

    it('клик по кнопке «Оформить заказ»', () => {
      cy.intercept('POST', 'api/orders', {
        fixture: 'orderResponse.json'
      }).as(`${'orderRequest'}`);

      const bunsList = cy.get('h3').contains('Булки').next('ul');
      const bunsAddButton = bunsList.contains('Добавить');
      bunsAddButton.click();

      const mainsList = cy.get('h3').contains('Начинки').next('ul');
      const mainsAddButton = mainsList.contains('Добавить');
      mainsAddButton.click();

      const orderRequestButton = cy.contains('Оформить заказ');
      orderRequestButton.click();

      cy.contains('36112');

      cy.get('body').type('{esc}');

      cy.contains('36112').should('not.exist');
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');

    });
  });
});
