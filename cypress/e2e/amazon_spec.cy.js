describe('Amazon template spec', () => {
  beforeEach(() => {
    cy.visit('https://amazon.pl')

    cy.get('#sp-cc-rejectall-link').then(($el) => {
      if ($el.length) {
        $el.click()
      }
    })
  })

  it('Search product', () => {
    // Check if the search bar is visible
    cy.get('#twotabsearchtextbox').should('be.visible');

    cy.get('#searchDropdownBox').select('Książki', {force:true})

    cy.get('#twotabsearchtextbox').type("Walter Moers", {force:true})

    cy.get('#nav-search-submit-button').click({force:true})

    // Check if the search results contain books by Walter Moers
    cy.contains('Walter Moers').should('exist');

    cy.get('[data-component-type="s-search-results"] a.a-link-normal.s-no-outline').first().click()

    // Verify that the product detail page has loaded
    cy.get('#productTitle').should('be.visible');
  })
})