describe('тестирование работы модальных окон', () => {
  beforeEach(() => {
    // перехват запроса ингредиентов
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // посещаем главную страницу
    cy.visit('/');
    
    // ждем завершения запроса ингредиентов
    cy.wait('@getIngredients');
  });

  it('Должен открывать модальное окно при клике на ингредиент', () => {
    cy.contains('Краторная булка N-200i').click();

    // проверяем содержимое модального окна
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Краторная булка N-200i').should('be.visible');
    cy.contains('Калории, ккал').should('be.visible');
    cy.contains('420').should('be.visible');
    cy.get('img[alt="изображение ингредиента."]').should('be.visible');
  });

  it('Должен закрывать модальное окно по клику на крестик', () => {
    cy.contains('Краторная булка N-200i').click();

    // закрываем по крестику 
  cy.get('button:has(svg)')
    .first()
    .click({ force: true });

    // проверяем, что модальное окно закрылось
    cy.contains('[class="text_type_main-large"]').should('not.exist');
  });

  it('Должен закрывать модальное окно по нажатию Escape', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('body').type('{esc}');
    cy.contains('Детали ингредиента').should('not.exist');
  });

});
