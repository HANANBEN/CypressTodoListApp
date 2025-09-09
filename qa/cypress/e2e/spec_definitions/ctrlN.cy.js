import todoListPage from '../page_objects/TodoListPage';

describe('Todo List - Raccourci Ctrl+N', () => {


  it('Ouvrir un nouvel input avec Ctrl+N', () => {
    todoListPage.pressCtrlN();
    todoListPage.checkNewInputVisible();
  });

});
