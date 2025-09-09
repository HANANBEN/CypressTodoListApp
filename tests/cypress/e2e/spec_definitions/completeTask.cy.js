import todoListPage from '../page_objects/TodoListPage';

describe('Todo List - Compléter des tâches', () => {

  beforeEach(() => {
    todoListPage.addTask('Lire un livre');
  });

  it('Marquer une tâche comme terminée', () => {
    todoListPage.completeTask('Lire un livre');
    todoListPage.checkTaskCompleted('Lire un livre');
    todoListPage.verifyProgress(1 , 1);
  });

  it('Marquer une tâche comme non terminée', () => {
    todoListPage.completeTask('Lire un livre');
    todoListPage.checkTaskCompleted('Lire un livre');
    todoListPage.uncompleteTask('Lire un livre');
    todoListPage.checkTaskNotCompleted('Lire un livre');
     todoListPage.verifyProgress(0 , 1);
  });

});
