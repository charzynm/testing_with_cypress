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
    cy.get('#searchDropdownBox').select('Książki', {force:true})

    cy.get('#twotabsearchtextbox').type("Walter Moers", {force:true})

    cy.get('#nav-search-submit-button').click({force:true})

    cy.get('[data-component-type="s-search-results"] a.a-link-normal.s-no-outline').first().click()
  })
})