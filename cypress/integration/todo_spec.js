/* global cy */

describe('Main Page', () => {

  beforeEach(() => {
    cy.visit('localhost:3000')
  })

  it('should render the TodoList component', () => {
    cy.get('[data-cy="todo-list"]').should('be.visible');
  });

  it('successfully renders todo form', () => {
    cy.get('[data-cy="todo-form"]').should('exist')
  })

  it('can add a new todo', () => {
    const itemText = 'New Todo Item'
    const itemDate = '2024-12-31'

    cy.get('[data-cy="todo-text"]').type(itemText)
    cy.get('[data-cy="date"]').type(itemDate)
    cy.get('[data-cy="add"]').click()

    cy.contains(itemText)
    cy.contains(itemDate)
  })

  it('can remove a todo', () => {
    const itemText = 'Todo Item to remove'
    const itemDate = '2024-12-31'

    cy.get('[data-cy="todo-text"]').type(itemText)
    cy.get('[data-cy="date"]').type(itemDate)
    cy.get('[data-cy="add"]').click()

    cy.get('[data-cy="delete"]').click()
    cy.contains(itemText).should('not.exist')
  })

  it('can mark a todo as completed', () => {
    const itemText = 'Todo Item to complete'
    const itemDate = '2024-12-31'

    cy.get('[data-cy="todo-text"]').type(itemText)
    cy.get('[data-cy="date"]').type(itemDate)
    cy.get('[data-cy="add"]').click()

    cy.get('input[type=checkbox]').click()
  })

  it('can edit a todo', () => {
    const itemText = 'Todo Item to edit'
    const itemDate = '2024-12-31'
    const newText = 'Edited Todo Item'
    const newDate = '2025-01-01'

    cy.get('[data-cy="todo-text"]').type(itemText)
    cy.get('[data-cy="date"]').type(itemDate)
    cy.get('[data-cy="add"]').click()

    cy.get('[data-cy="edit"]').click()
    cy.get('[data-cy="new-text"]').clear().type(newText)
    cy.get('[data-cy="new-date"]').clear().type(newDate)
    cy.get('[data-cy="save"]').click()

    cy.contains(newText)
    cy.contains(newDate)
  })

  it('can duplicate a todo', () => {
    const itemText = 'Todo Item to duplicate'
    const itemDate = '2024-12-31'

    cy.get('[data-cy="todo-text"]').type(itemText)
    cy.get('[data-cy="date"]').type(itemDate)
    cy.get('[data-cy="add"]').click()

    cy.get('[data-cy="duplicate"]').click()

    cy.get('[data-cy="todo-item"]').should('have.length', 2)
  })


  it('can switch between viewing completed and pending todos', () => {
    const itemText1 = 'Completed Todo Item'
    const itemDate1 = '2024-12-31'

    const itemText2 = 'Pending Todo Item'
    const itemDate2 = '2025-01-01'

    cy.get('[data-cy="todo-text"]').type(itemText1)
    cy.get('[data-cy="date"]').type(itemDate1)
    cy.get('[data-cy="add"]').click()

    cy.get('input[type=checkbox]').click()

    cy.get('[data-cy="todo-text"]').type(itemText2)
    cy.get('[data-cy="date"]').type(itemDate2)
    cy.get('[data-cy="add"]').click()

    cy.contains('View Completed Todos').click()
    cy.contains(itemText1)
    cy.get('input[type=checkbox]').should('be.checked');
    cy.contains(itemText2).should('not.exist')

    cy.contains('View Pending Todos').click()
    cy.contains(itemText2)
    cy.contains(itemText1).should('not.exist')
  })

});
