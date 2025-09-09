class BasePage {
  click(selector) {
    cy.get(selector).click();
  }

  type(selector, text) {
    cy.get(selector).clear().type(text);
  }

  isVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  shouldContain(selector, text) {
    cy.get(selector).should('contain.text', text);
  }

  shouldNotExist(selector) {
    cy.get(selector).should('not.exist');
  }
}

export default BasePage;
