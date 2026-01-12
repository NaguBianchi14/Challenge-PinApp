import loginPage from "../pages/loginPage"

Cypress.Commands.add("login", (user, pass) => {
    cy.url().should('eq', Cypress.env("baseUrl"))
    cy.doType(loginPage.userInput(), user)
    cy.doType(loginPage.passInput(), pass)
    cy.doClick(loginPage.loginBtn())
})

//Comando simple para escribir en un campo de texto
//tiene una pequenia modificacion para aceptar valores desde el contexto de cypress si es el caso
Cypress.Commands.add('doType', (element, value) => {
    cy.then(function () {
        const input = this[value] || value
        cy.get(element).should('be.visible').type(input)
    })
})

//Comando simple para hacer click
Cypress.Commands.add('doClick', (element) => {
    cy.get(element).should('be.visible').click()
})

//Comando simple para validar visibilidad
Cypress.Commands.add('beVisible', (element) => {
    cy.get(element).should('be.visible')
})

//Comando simple para validar url
Cypress.Commands.add('urlValidator', (url) => {
    cy.url().should('eq', url)
})

Cypress.Commands.add('textValidator', (element, text) => {
    cy.get(element).should('have.text', text)
})

//Obtenemos un texto para validarlo luego, el parametro de alias se pone un string por ej 'alias' y luego para usarlo en otro paso usas el alias que le pusiste
Cypress.Commands.add('getText', (locator, alias) => {
    cy.get(locator).invoke('text').then((text) => {
        cy.then(function () {
            const cleanedText = text.trim()
            this[alias] = cleanedText
            cy.log(`Texto capturado desde selector "${locator}"`)
            cy.log(`Guardado en alias "${alias}": "${cleanedText}"`)
        })
    })
})