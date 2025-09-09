import todoListPage from '../page_objects/TodoListPage';

describe('Todo List - Suppression de tâches', () => {

  beforeEach(() => {
    todoListPage.addTask('Aller au sport');
  });

  it('Supprimer une tâche individuelle', () => {
    todoListPage.deleteTask('Aller au sport');
    todoListPage.checkTaskNotExists('Aller au sport');
  });

//   it('Supprimer toutes ;les tâches', () => {
//     todoListPage.addTask('Appeler maman');
//     todoListPage.clearAllTasks();
//     todoListPage.checkNoTasksExist();
//   });

});
