import todoListPage from '../page_objects/TodoListPage';
import tasks from '../../fixtures/tasks.json';

describe('Todo List - Tâches invalides', () => {


  it('Empêcher tâche vide', () => {
    todoListPage.typeEmptyTask();
    todoListPage.pressEnter();
     todoListPage.checkNoTaskAdded();
  });

  it('Empêcher tâche avec espaces uniquement', () => {
    todoListPage.typeTask(tasks.spacesTask);
    todoListPage.pressEnter();
    todoListPage.checkNoTaskAdded();

  });

  it('Empêcher tâche tros long', () => {
    todoListPage.typeTask(tasks.longTask);
    todoListPage.pressEnter();
    todoListPage.checkTaskNotExists(tasks.longTask);
  });

});
