import * as React from 'react';
import { mount } from '@cypress/react';
import NotFound from './NotFound';

describe('NotFound', () => {
    it('renders', () => {
        mount(<NotFound/>)
    })

    it('Dispays correct info', () => {
        mount(<NotFound/>)
    
       cy.get('div').contains("Sorry, couldn't find what you were looking for :/")
    })
})