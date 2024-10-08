describe('Todo App', () => {
  beforeEach(() => {
    // Visit the root page where the app is running
    cy.visit('/table');
  });

  //done
  it('should add a new task', () => {
    // Add a new task
    cy.get('input[placeholder="Task"]').type('New Task');
    cy.get('input[placeholder="Description"]').type('New Description');
    cy.get('select').select('High');
    cy.get('button').contains('Add task').click();
  });

  //done
  it('should cancel the deletion of a task', () => {
    // Add a task
    cy.xpath(
      '/html/body/div[1]/div/div/div/div[2]/div/div/main/div/div[2]/main/div[2]/div/div/table/tbody/tr[1]/td[5]/div/span[2]/button'
    )
      .should('be.visible')
      .click();
    cy.get('button').contains('No');
  });

  //done
  it('Open Flyout and close flyout', () => {
    // Wait for the page to load
    cy.xpath(
      '/html/body/div[1]/div/div/div/div[2]/div/div/main/div/div[2]/main/div[2]/div/div/table/tbody/tr[1]/td[5]/div/span[1]/button'
    ).click();
    cy.wait(3000);
    cy.get('button').contains('Cancel').click();
  });

  //done
  it('Update case', () => {
    // Add a task
    cy.get('input[placeholder="Task"]').type('Task not to be deleted');
    cy.get('input[placeholder="Description"]').type('Description not to be deleted');
    cy.get('button').contains('Add task').click();
    cy.xpath(
      '/html/body/div[1]/div/div/div/div[2]/div/div/main/div/div[2]/main/div[2]/div/div/table/tbody/tr[1]/td[5]/div/span[1]/button'
    ).click();

    cy.xpath('/html/body/div[4]/div[2]/div/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/input')
      .clear()
      .type('Hello world');
    cy.xpath('/html/body/div[4]/div[2]/div/div[2]/div/div/div/div[2]/div/div[2]/div/div/div/input')
      .clear()
      .type('Hello world');

    cy.xpath(
      '/html/body/div[4]/div[2]/div/div[2]/div/div/div/div[3]/div/div[2]/div/button'
    ).click();
    cy.xpath(
      '/html/body/div[4]/div[2]/div/div[2]/div/div/div/div[4]/div/div[2]/div/div/select'
    ).select('High');
    cy.xpath('/html/body/div[4]/div[2]/div/div[3]/button[2]').click({ force: true });
  });

  it('Delete case', () => {
    // Add a task
    cy.xpath(
      '/html/body/div[1]/div/div/div/div[2]/div/div/main/div/div[2]/main/div[2]/div/div/table/tbody/tr[1]/td[5]/div/span[2]/button'
    )
      .should('be.visible')
      .click();
    cy.get('button').contains('Yes');
  });
});
