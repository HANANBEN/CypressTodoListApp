import todoListPage from '../page_objects/TodoListPage';

describe('Todo List - Barre de progression', () => {

  beforeEach(() => {
    todoListPage.addTask('A');
    todoListPage.addTask('B');
  });

  it('Mettre à jour la progression après complétion', () => {
    todoListPage.completeTask('A');
    todoListPage.verifyProgress(1,2);
  });

  it('Mettre à jour la progression après suppression', () => {
    todoListPage.deleteTask('B');
    todoListPage.verifyProgress(1,1);
  });

});
