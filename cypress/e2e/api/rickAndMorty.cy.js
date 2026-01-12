describe("Rick and Morty API - Personajes", () => {

  it("GET character by id 1 returns valid character", () => {
    cy.apiGetCharacter(1).then((res) => {
      expect(res.status).to.eq(200)

      const character = res.body
      expect(character).to.include.keys(
        "id",
        "name",
        "status",
        "species",
        "gender",
        "origin",
        "location",
        "image"
      )
      expect(character.id).to.eq(1)
      expect(character.name).to.eq("Rick Sanchez")
    })
  })

  it("GET characters list returns paginated result", () => {
    cy.apiGetCharacters().then((res) => {
      expect(res.status).to.eq(200)

      expect(res.body).to.have.property("info")
      expect(res.body).to.have.property("results")
      expect(res.body.results).to.be.an("array").and.not.be.empty
    })
  })

  it("GET character not found returns 404", () => {
    cy.apiGetCharacterNotFound(6666666).then((res) => {
      expect(res.status).to.eq(404)
      expect(res.body).to.have.property("error")
    })
  })

})
