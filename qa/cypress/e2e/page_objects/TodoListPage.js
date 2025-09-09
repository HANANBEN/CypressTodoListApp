import locators from '../../support/locators/todoListlocator.js';
import BasePage from './BasePage.js';
import { verifyProgress as utilsVerifyProgress } from '../../support/utils.js';

class TodoListPage extends BasePage {
  open() {
    cy.visit('/');
  }

  // --- Saisie et Ajout de tâche---
  typeTask(task) {
    this.type(locators.input, task);
  }

  typeEmptyTask() {
   this.pressEnter();
  }

  pressEnter() {
    cy.get(locators.input).focus().type('{enter}');
  }

  clickAddButton() {
    cy.get(locators.addButton).click();
  }

  addTask(task) {
    this.typeTask(task);
    this.pressEnter();
  }

  // --- Vérifications sur les tâches ---
  checkTaskExists(task) {
    cy.contains(locators.taskItem, task).should('be.visible');
  }

  checkTaskNotExists(task) {
    cy.contains(locators.taskItem, task).should('not.exist');
  }

  checkNoTaskAdded() {
    cy.get(locators.taskItem).should('have.length', 0);
  }

  checkTaskCompleted(task) {
    cy.contains(locators.taskItem, task)
      .should('have.css', 'text-decoration')
      .and('contain', 'line-through');
    
      cy.contains(locators.taskItem, task)
  .parents(locators.todoListCards)
  .contains('✓ Terminé')
  .should('be.visible');
  }

   completeTask(task) {
  cy.contains(locators.taskItem, task)  
  .parents(locators.todoListCards)                   
    .find(locators.checkbox)              
      .click();                                     
}

   uncompleteTask(task) {
  cy.contains(locators.taskItem, task)                  
    .parents(locators.todoListCards)                    
    .find(locators.checkbox)                     
    .click()                                            
    .should('have.attr', 'aria-checked', 'false');      
}
  checkTaskNotCompleted(task) {
    cy.contains(locators.taskItem, task)
      .should('not.contain', 'line-through');
    
  }

  checkTaskOrder(expectedOrder) {
  cy.get(locators.taskItem).should(($tasks) => {
    const texts = [...$tasks].map(el => el.innerText.trim());
    expect(texts).to.deep.equal(expectedOrder);
  });
}
  checkTaskSanitized(malicious) {
    cy.contains(locators.taskItem, malicious).should('not.exist');
  }

  // --- Actions sur les tâches ---
  markTaskAsCompleted(task) {
    cy.contains(locators.taskItem, task).find(locators.checkbox).check();
  }

  unmarkTask(task) {
    cy.contains(locators.taskItem, task).find(locators.checkbox).uncheck();
  }

  deleteTask(task) {
  cy.contains(locators.taskItem, task)
    .parents(locators.todoListCards)
    .find(locators.deleteButton)   // au lieu de .get()
    .click();
}
  

  clearAllTasks() {
    cy.get(locators.clearAllButton).click();
  }

  // dragAndDrop(sourceTask, targetTask) {
    
  //  cy.contains(locators.taskItem, sourceTask)       // find the text
  // .closest(locators.todoListCards)             // get the parent draggable card
  // .drag(
  //   cy.contains(locators.taskItem, targetTask)  // find the target text
  //     .closest(locators.todoListCards) ,
  //     {force : true}       // get target card
  // );
  // }
   dragAndDrop(sourceTask, targetTask) {
    const dataTransfer = new DataTransfer();

    cy.contains(locators.taskItem, sourceTask)
      .closest(locators.todoListCards)
      .trigger('mousedown', { which: 1, button: 0, force: true })
      .trigger('dragstart', { dataTransfer, force: true });

    cy.wait(100); // small wait to ensure drag events are registered

    cy.contains(locators.taskItem, targetTask)
      .closest(locators.todoListCards)
      .trigger('dragover', { dataTransfer, force: true })
      .trigger('drop', { dataTransfer, force: true });

    cy.contains(locators.taskItem, sourceTask)
      .closest(locators.todoListCards)
      .trigger('dragend', { dataTransfer, force: true });
  }

  // --- Progression ---
  verifyProgress(completedTasks, totalTasks) {
    utilsVerifyProgress(completedTasks, totalTasks);
  }

 

  // --- Accessibilité / Sécurité ---
  pressCtrlN() {
    cy.get('body').type('{ctrl}n');
  }

  checkNewInputFocused() {
    cy.get(locators.input).should('be.visible').and('have.focus');
  }
  checkNewInputVisible() {
    cy.get(locators.input).should('be.visible');
  }

  verifyCtrlNHintNotVisible() {
    cy.get(locators.input)
    .should('have.attr', 'placeholder')
    .and('not.contain', 'Ctrl+N');
  }

}

export default new TodoListPage();
