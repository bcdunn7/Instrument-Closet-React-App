import * as React from 'react';
import { mount } from '@cypress/react';
import Footer from './Footer';

describe('Footer', () => {
    it('renders', () => {
        mount(<Footer/>)
    })

    it('Dispays correct info', () => {
        mount(<Footer/>)
    
        cy.get('.Footer > :nth-child(1)').contains('Backend')
        cy.get('.Footer > :nth-child(2)').contains('TheInstrumentCloset')
        cy.get('.Footer > :nth-child(3)').contains('Frontend')
    })
})