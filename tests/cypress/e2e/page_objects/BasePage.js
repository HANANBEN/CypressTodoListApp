class BasePage {
   click(element) {
    cy.get(element).click();
  }

  type(element, text) {
    cy.get(element).clear().type(text);
  }

  isVisible(element) {
    cy.get(element).should('be.visible');
  }
}

export default BasePage;