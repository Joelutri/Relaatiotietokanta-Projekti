describe('template spec', () => {
    it ('passes', () => {
        cy.visit('https://projectdatabase.azurewebsites.net/src/pages/index.html')

        cy.get('#data-list div').contains('ASFOLTO').click()
        cy.get('button').contains('back').click()
        cy.visit('https://projectdatabase.azurewebsites.net/src/pages/index.html')
    })
})