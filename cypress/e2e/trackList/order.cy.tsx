describe('тестирование создания заказа', () => {
  beforeEach(() => {
    // мокируем все необходимые запросы
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    // мокируем токены
    cy.setCookie('accessToken', 'test-access-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Должен создавать заказ и показывать модальное окно', () => {
    // добавляем булку
    cy.contains('Краторная булка N-200i')
      .parent()
      .within(() => {
        cy.get('button').click();
      });

    // добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .within(() => {
        cy.get('button').click();
      });

    // добавляем соус
    cy.contains('Соус Spicy-X')
      .parent()
      .within(() => {
        cy.get('button').click();
      });

    // Вызывается клик по кнопке «Оформить заказ»
    cy.contains('Оформить заказ').click();

    // проверяем, что модальное окно заказа открылось
    cy.contains('идентификатор заказа').should('be.visible');

    // проверяем номер заказа
    cy.contains('12345').should('be.visible');

    // закрываем модальное окно
    cy.get('body').type('{esc}');

    // проверяем, что модальное окно закрылось
    cy.contains('идентификатор заказа').should('not.exist');

    // проверяем, что конструктор пуст
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});