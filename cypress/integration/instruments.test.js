describe('Instrument List', () => {
    beforeEach(() => {
        cy.login();
    })
    it('Shows instrument page', () => {   
        cy.visit('http://localhost:3000/instruments');
        cy.get('[href="/reservations"] > .MuiButton-root')
        cy.get('[href="/profile"] > .MuiButton-root')
        cy.get('[href="/instruments"] > .MuiButton-root')
        cy.get('div.Navbar-navlink > .MuiButton-root')

        cy.get('#mui-1')
        cy.contains('Search')
    })
})