class productsPage {
    //-----------------------------------------------Buttons-----------------------------------------------
    addCartBtn(itemName) {
        return `button[data-test="add-to-cart-${itemName}"]`
    }
    cartBtn() {
        return '[data-test="shopping-cart-link"]'
    }
    //-----------------------------------------------Inputs------------------------------------------------
    //-----------------------------------------------Asserts-----------------------------------------------
    inventoryAssert() {
        return '.inventory_container'
    }
    priceAssert(slug) {
        return `[data-test="add-to-cart-${slug}"]`
    }
    cartBadge() {
        return '.shopping_cart_badge'
    }
    //-----------------------------------------------Methods---------------------------------------------
    //Metodo especifico para obtener el precio de un producto con selector dinamico
    getPrice(slug, alias) {
        cy.get(`[data-test="add-to-cart-${slug}"]`)
        .closest('.inventory_item')
        .find('.inventory_item_price')
        .invoke('text')
        .then((priceText) => {
            const cleanedPrice = priceText.trim()
            cy.wrap(cleanedPrice).as(alias)
            cy.log(`Texto capturado desde selector "${slug}"`)
            cy.log(`Guardado en alias "${alias}": "${cleanedPrice}"`)
        })
    }

    getCartCount(alias) {
        cy.get('body').then(($body) => {
            const count = $body.find(this.cartBadge()).length
            ? Number($body.find(this.cartBadge()).text())
            : 0

            cy.wrap(count).as(alias)
            cy.log(`Cantidad en carrito: ${count}`)
        })
    }

    cartValidator(expectedCountAlias, actualCountAlias) {
        cy.then(function () {
            expect(this[expectedCountAlias]).to.equal(actualCountAlias)
        })
    }
}

export default new productsPage()