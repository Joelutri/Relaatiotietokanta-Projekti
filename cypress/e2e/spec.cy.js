describe('template spec', () => {
    it ('passes', () => {
        cy.visit('https://projectdatabase.azurewebsites.net/src/pages/index.html')
        cy.get('a').contains('Dev tools').click()
        /*
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('cypressTest');
          });
        cy.get('.postPrompt').contains('New Rank').click()
        cy.on('window:confirm', () => true);

        cy.get('.postPrompt').contains('New Champion').click()
        cy.on('window:confirm', () => true);

        cy.get('.postPrompt').contains('New Skin').click()
        cy.on('window:confirm', () => true);
        */
        cy.get('a').contains('New Game').click()
        /*
        cy.get('.linkTXT').contains('Create player').click()
        cy.get('#playerName').type('cypressTest')
        cy.get('#rankNameInput').type('cypressTest')
        cy.get('.postSubmit').contains('Send').click()
        cy.get('button').contains('Back').click()
*/
        cy.get('#championNameInput').type('cypressTest')
        cy.get('#playerNameInput').type('cypressTest')
        cy.get('#skinNameInput').type('cypressTest')
        cy.get('.postSubmit').contains('send').click()

        cy.get('a').contains('Players').click()
        cy.get('#data-list div').contains('cypressTest').click()
    })
})