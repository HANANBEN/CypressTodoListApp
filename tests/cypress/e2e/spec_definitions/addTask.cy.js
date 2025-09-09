import todoListPage from '../page_objects/TodoListPage';
import tasks from '../../fixtures/tasks.json';

describe('Todo List - Ajout de tâches', () => {


  it('Ajout tâche valide avec Enter', () => {
    todoListPage.typeTask(tasks.validTask[0]);
    todoListPage.pressEnter();
    todoListPage.checkTaskExists(tasks.validTask[0]);
    todoListPage.verifyProgress(0,1);
  });

  it('Ajout tâche valide avec bouton +', () => {
    todoListPage.typeTask(tasks.validTask[1]);
    todoListPage.clickAddButton();
    todoListPage.checkTaskExists(tasks.validTask[1]);
    todoListPage.verifyProgress(0,1);
  });

});
