import todoListPage from '../page_objects/TodoListPage';
import tasks from '../../fixtures/tasks.json';

describe('Todo List - Suppression de tâches', () => {

  beforeEach(() => {
    todoListPage.addTask(tasks.validTask[2]);
  });

  it('Supprimer une tâche individuelle', () => {
    todoListPage.deleteTask(tasks.validTask[2]);
    todoListPage.checkTaskNotExists(tasks.validTask[2]);
  });

//   it('Supprimer toutes ;les tâches', () => {
//     todoListPage.addTask('Appeler maman');
//     todoListPage.clearAllTasks();
//     todoListPage.checkNoTasksExist();
//   });

});
