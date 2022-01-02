import * as React from 'react';
import { mount } from '@cypress/react';
import Calendar from './Calendar';

describe('Calendar', () => {
    it('renders', () => {
        mount(<Calendar/>)
    })

    it('Dispays correct info', () => {
        mount(<Calendar/>)
    
        cy.get('.fc-today-button').contains('today')
        cy.get('.fc-day-sun > .fc-scrollgrid-sync-inner > .fc-col-header-cell-cushion').contains('Sun')
    })
})