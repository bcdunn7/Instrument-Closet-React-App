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

    it('Logs-in User and navigate through pages', () => {
        cy.visit('http://localhost:3000/');
        cy.get('#username').click();
        cy.get('#username').type('testuser');
        cy.get('#password').type('password');
        cy.get('.MuiButton-contained').click();
        cy.get('.LoginForm').submit();

        cy.contains('Filter by type')  
    })

    it('shows signup page', () => {
        cy.visit('http://localhost:3000/signup');
        cy.get('.SignupForm-heading').click();
        cy.get('#username').click();
        cy.get('#username').type('a');
        cy.get('#password').click();
        cy.get('#password').type('a');
        cy.get('#firstName').click();
        cy.get('#firstName').type('a');
        cy.get('#lastName').click();
        cy.get('#lastName').type('a');
        cy.get('#email').click();
        cy.get('#email').type('a');
        cy.get('#phone').click();
        cy.get('#phone').type('a');
        cy.get('.MuiButton-contained').click();
        cy.get('.SignupForm-form').submit();
        cy.contains('Not a valid')
    })
})

describe('Walkthrough e2e', () => {
    it('Normal user navigation', () => {
        cy.visit('http://localhost:3000/instruments');
        cy.get('#username').click();
        cy.get('#username').type('testuser');
        cy.get('#password').type('password');
        cy.get('.MuiButton-contained').click();
        cy.get('.LoginForm').submit();
        cy.get('.active > .MuiButton-root').click();
        cy.get('.TagFilters-span')
        cy.get('.MuiOutlinedInput-root').type('b{enter}');
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardActions-root > .MuiGrid-container > :nth-child(2) > .MuiTypography-root').click();
        cy.get('.fc-icon-chevron-right').click();
        cy.get('.fc-today-button').click();
        cy.get('.MuiButton-outlinedPrimaryDark').click();
        cy.get('#mui-6').click();
        cy.get('.MuiPaper-root > .MuiDialogActions-root > :nth-child(2)').click();
        cy.get('.css-odkfer-MuiButtonBase-root-MuiButton-root').click();
        cy.get('[href="/reservations"] > .MuiButton-root').click();
        cy.get('h3').click();
        cy.get('[href="/profile"] > .MuiButton-root').click();
        cy.get('#firstName').click();
        cy.get('#lastName').click();
        cy.get('#email').click();
        cy.get('#phone').click();
        cy.get('#DeleteUserBtn-main').click();
        cy.get('#DeleteUserBtn-cancel').click();
    })
})