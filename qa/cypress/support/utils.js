import locators from './locators/todoListlocator';

export function verifyProgress(completedTasks, totalTasks) {

    //verify the Fraction of completed tasks in the progression card 
 const expectedText = `${completedTasks}/${totalTasks} terminées`;
  cy.contains(locators.todoListCards, 'Progression')
    .should('be.visible')
    .find(locators.progressFraction)
    .should('contain.text', expectedText);


    // verify percentage of tasks that were completed 
   const expectedPercentage = Math.round((completedTasks / totalTasks) * 100);
    const expectedPercentageText = `${expectedPercentage}% complété`;
  cy.contains(locators.todoListCards, 'Progression')
    .should('be.visible')
    .find(locators.progressPercentage) 
    .should('contain.text', expectedPercentageText);
}
