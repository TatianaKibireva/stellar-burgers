describe('Конструктор бургеров', () => {
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

it('Должен добавлять булку в конструктор', () => { 
    
    // находим булку и добавляем ее в конструктор
    cy.contains('Краторная булка N-200i')
      .should('be.visible')
      .parent()
      .within(() => {
        cy.get('button').click();
      });

    // проверяем, что булка добавилась в конструктор
    cy.contains('Краторная булка N-200i (верх)').should('exist');
    cy.contains('Краторная булка N-200i (низ)').should('exist');
  });
});
