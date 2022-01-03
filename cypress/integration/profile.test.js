describe('Profile', () => {
    beforeEach(() => {
        cy.login();
    })
    it('Shows profile page', () => {   
        cy.visit('http://localhost:3000/profile');
        cy.get('[href="/reservations"] > .MuiButton-root')
        cy.get('[href="/profile"] > .MuiButton-root')
        cy.get('[href="/instruments"] > .MuiButton-root')
        cy.get('div.Navbar-navlink > .MuiButton-root')

        cy.contains('Edit Your Personal')
    })
})