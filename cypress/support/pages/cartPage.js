class cartPage {
    //-----------------------------------------------Buttons-----------------------------------------------
    checkoutBtn() {
        return '[data-test="checkout"]'
    }
    //-----------------------------------------------Inputs------------------------------------------------
    //-----------------------------------------------Asserts-----------------------------------------------
    //-----------------------------------------------Methods---------------------------------------------
    itemCount(count) {
        cy.get('.cart_item').should('have.length', count)
    }

    cartQuantityValidator(quantity) {
        cy.get('.cart_quantity').each(($qty) => {
            expect($qty.text().trim()).to.eq(quantity)
        })
    }
}

export default new cartPage()