describe('Application Testing', () => {
    it('Show Home/Login Page', () => {
        cy.visit('/');

        cy.contains('Login');
        cy.contains('TheInstrumentCloset');
        cy.contains('An Instrument Inventory');
        cy.contains('Sign in to');
        cy.contains('Backend');

        const signupBtn = cy.get('.Navbar-navlink > .MuiButton-root');
        signupBtn.contains('Signup');

        
    })

    it('')
})