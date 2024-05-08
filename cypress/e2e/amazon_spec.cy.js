describe('Amazon template spec', () => {
  beforeEach(() => {
    cy.visit('https://amazon.pl')
  })

  it('Search product', () => {
    cy.get('#searchDropdownBox').select('Książki', {force:true})

    cy.get('#twotabsearchtextbox').type("Walter Moers", {force:true})

    cy.get('#nav-search-submit-button').click({force:true})

    cy.get('[data-component-type="s-search-results"]').as("products")

    cy.get("@products").eq(0).invoke('text').then(productText => {
      cy.log(productText)
    })
  })
})