class checkoutPage {
    //-----------------------------------------------Buttons-----------------------------------------------
    checkoutBtn() {
        return '[data-test="checkout"]'
    }
    continueBtn() {
        return '[data-test="continue"]'
    }
    finishBtn() {
        return '[data-test="finish"]'
    }
    backToHomeBtn() {
        return '[data-test="back-to-products"]'
    }
    //-----------------------------------------------Inputs------------------------------------------------
    firstNameInput() {
        return '[data-test="firstName"]'
    }
    lastNameInput() {
        return '[data-test="lastName"]'
    }
    zipCodeInput() {
        return '[data-test="postalCode"]'
    }
    //-----------------------------------------------Asserts-----------------------------------------------
    titleAssert() {
        return '[data-test="title"]'
    }
    orderId() {
        return '[data-test="payment-info-value"]'
    }
    thankYouMessage() {
        return '.complete-header'
    }
    infoMessage() {
        return '.complete-text'
    }
    //-----------------------------------------------Methods---------------------------------------------
    validateSubtotal(pricesAliasArray) {
        cy.then(function () {
            const prices = pricesAliasArray.map(alias =>
                parseFloat(this[alias].replace('$', ''))
            )
        const expectedSubtotal = prices
            .reduce((acc, price) => acc + price, 0)
            .toFixed(2)
        cy.get('[data-test="subtotal-label"]')
            .invoke('text')
            .then((text) => {
                const uiSubtotal = parseFloat(text.replace('Item total: $', ''))
                expect(uiSubtotal).to.eq(Number(expectedSubtotal))
            })
        })
    }

    validateTotalWithTax() {
        const toNumber = (text) =>
            parseFloat(text.replace(/[^0-9.]/g, ''))
        cy.get('[data-test="subtotal-label"]').invoke('text').then((subtotalText) => {
            const subtotal = toNumber(subtotalText)
            cy.get('[data-test="tax-label"]').invoke('text').then((taxText) => {
                const tax = toNumber(taxText)
                cy.get('[data-test="total-label"]').invoke('text').then((totalText) => {
                    const total = toNumber(totalText)
                    const expectedTotal = Number((subtotal + tax).toFixed(2))
                    expect(total).to.eq(expectedTotal)
                    cy.log(`Subtotal: ${subtotal}`)
                    cy.log(`Tax: ${tax}`)
                    cy.log(`Expected Total: ${expectedTotal}`)
                    cy.log(`Total: ${total}`)
                })
            })
        })
    }
}

export default new checkoutPage()