import todoListPage from '../page_objects/TodoListPage';
import tasks from '../../fixtures/tasks.json';

describe('Todo List - Sécurité XSS', () => {


  it('Bloquer injection de script', () => {
    todoListPage.addTask(tasks.xssTask);
    todoListPage.checkTaskExists(tasks.xssTask);
  });

});
