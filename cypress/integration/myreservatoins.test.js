describe('My Reservations', () => {
    it('Shows my reservation page', () => {   
        cy.visit('http://localhost:3000/');
        cy.get('#username').click();
        cy.get('#username').type('testuser');
        cy.get('#password').type('password');
        cy.get('.MuiButton-contained').click();
        cy.get('.LoginForm').submit();

        cy.get('[href="/reservations"] > .MuiButton-root').click();
        cy.visit('http://localhost:3000/reservations');
        cy.get('[href="/reservations"] > .MuiButton-root')
        cy.get('[href="/profile"] > .MuiButton-root')
        cy.get('[href="/instruments"] > .MuiButton-root')
        cy.get('div.Navbar-navlink > .MuiButton-root')

        
    })
})