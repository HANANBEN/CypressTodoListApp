import todoListPage from '../page_objects/TodoListPage';

describe('Todo List - Raccourci Ctrl+N', () => {


  it('Ouvrir un nouvel input avec Ctrl+N', () => {
    todoListPage.pressCtrlN();
    todoListPage.checkNewInputFocused();
  });
   
  it('Ne montre pas l’indication Ctrl+N sur mobile', () => {
  cy.viewport('iphone-6');
  todoListPage.checkNewInputVisible();
  todoListPage.verifyCtrlNHintNotVisible();
});
});
