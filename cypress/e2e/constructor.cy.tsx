describe('проверяем функциональность приложения', () => {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as(`${'getIngredients'}`);

    cy.visit('http://localhost:4000');
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
      const bunssList = cy.get('h3').contains('Булки').next('ul');
      const addButton = bunssList.contains('Добавить');

      cy.get('div').contains('Выберите булки').should('exist');

      addButton.click();

      cy.get('div').contains('Выберите булки').should('not.exist');
    });

    it('ингредиент добавляется в конструктор', () => {
      const mainsList = cy.get('h3').contains('Начинки').next('ul');
      const addButton = mainsList.contains('Добавить');

      cy.get('div').contains('Выберите начинку').should('exist');

      addButton.click();

      cy.get('div').contains('Выберите начинку').should('not.exist');
    });
  });
});
