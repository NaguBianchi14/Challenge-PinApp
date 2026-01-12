const apiBase = () => {
  const base = Cypress.env("api")
  expect(base, "API base url").to.match(/^https?:\/\//)
  return base
}

const buildUrl = (path) =>
  `${apiBase()}${path.startsWith("/") ? "" : "/"}${path}`



Cypress.Commands.add("apiGetCharacter", (id, options = {}) => {
  return cy.api({
    method: "GET",
    url: buildUrl(`/character/${id}`),
    failOnStatusCode: options.failOnStatusCode ?? true
  })
})

Cypress.Commands.add("apiGetCharacters", () => {
  return cy.api({
    method: "GET",
    url: buildUrl("/character")
  })
})

Cypress.Commands.add("apiGetCharacterNotFound", (id) => {
  return cy.api({
    method: "GET",
    url: buildUrl(`/character/${id}`),
    failOnStatusCode: false
  })
})
