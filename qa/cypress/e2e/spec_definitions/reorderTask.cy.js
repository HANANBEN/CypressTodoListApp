import todoListPage from '../page_objects/TodoListPage';

describe('Todo List - Réorganisation des tâches', () => {

  beforeEach(() => {
    todoListPage.addTask('Première tâche');
    todoListPage.addTask('Deuxième tâche');
  });

  it('Réorganiser via Drag & Drop', () => {
    todoListPage.dragAndDrop('Deuxième tâche', 'Première tâche');
    todoListPage.checkTaskOrder(['Deuxième tâche', 'Première tâche']);
  });

});
