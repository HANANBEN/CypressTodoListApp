import todoListPage from '../page_objects/TodoListPage';
import tasks from '../../fixtures/tasks.json';

describe('Todo List - Compléter des tâches', () => {

  beforeEach(() => {
    todoListPage.addTask(tasks.validTask[0]);
  });

  it('Marquer une tâche comme terminée', () => {
    todoListPage.completeTask(tasks.validTask[0]);
    todoListPage.checkTaskCompleted(tasks.validTask[0]);
    todoListPage.verifyProgress(1 , 1);
  });

  it('Marquer une tâche comme non terminée', () => {
    todoListPage.completeTask(tasks.validTask[0]);
    todoListPage.checkTaskCompleted(tasks.validTask[0]);
    todoListPage.uncompleteTask(tasks.validTask[0]);
    todoListPage.checkTaskNotCompleted(tasks.validTask[0]);
     todoListPage.verifyProgress(0 , 1);
  });

});
