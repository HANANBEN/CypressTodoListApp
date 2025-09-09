export default {
  input :"input[placeholder='Ajouter une nouvelle tâche... (Ctrl+N)']",
  addButton: '[data-slot="button"]',
  todoListCards: 'div[data-slot="card"]',
  taskItem: 'span.flex-1',
  progressFraction: 'span.text-sm.text-muted-foreground',
  progressPercentage: '.mt-2',
  checkbox: '[data-slot="checkbox"]',
  deleteButton: '.space-y-3 > .text-card-foreground > .flex > .inline-flex',
  hintCtrlN: '[data-cy="hint-ctrlN"]'
};
