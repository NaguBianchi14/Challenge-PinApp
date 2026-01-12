import productsPage from "../../support/pages/productsPage"
import cartPage from "../../support/pages/cartPage"
import checkoutPage from "../../support/pages/checkoutPage"
describe("SauceDemo", () => {
  beforeEach(function() {
    cy.visit(Cypress.env("baseUrl"))
    cy.login(this.data.login.user, this.data.login.pass)
  })

  it("Purchase flow", function () {
    //Validamos que estamos en la page de productos
    cy.beVisible(productsPage.inventoryAssert())

    //Obtenemos el precio de los productos que vamos a agregar al carrito
    productsPage.getPrice(this.data.products.sauce_labs_backpack, 'backpackPrice')
    productsPage.getPrice(this.data.products.sauce_labs_fleece_jacket, 'jacketPrice')
    productsPage.getPrice(this.data.products.test_allthethings_tshirt_red, 'tshirtPrice')

    //Agregamos los productos al carrito y aprovechamos para validar el contador del carrito
    productsPage.getCartCount('initialCartCount')
    cy.doClick(productsPage.addCartBtn(this.data.products.sauce_labs_backpack))
    productsPage.getCartCount('firstCartCount')
    cy.doClick(productsPage.addCartBtn(this.data.products.sauce_labs_fleece_jacket))
    productsPage.getCartCount('secondCartCount')
    cy.doClick(productsPage.addCartBtn(this.data.products.test_allthethings_tshirt_red))
    productsPage.getCartCount('finalCartCount')
    //Validamos los contadores del carrito; para fines demostrativos los validamos uno por uno pero se podria hacer en un solo metodo
    //usando una misma nomenclatura para los "cartCount" y validandolos en un for incrementalmente
    productsPage.cartValidator('initialCartCount', 0)
    productsPage.cartValidator('firstCartCount', 1)
    productsPage.cartValidator('secondCartCount', 2)
    productsPage.cartValidator('finalCartCount', 3)

    //Vamos al carrito
    cy.doClick(productsPage.cartBtn())
    cy.urlValidator(this.url.cart)
    cartPage.itemCount(3)
    cartPage.cartQuantityValidator('1')
    cy.doClick(cartPage.checkoutBtn())

    //Vamos al checkout (3 steps)
    cy.urlValidator(this.url.checkout)
    cy.textValidator(checkoutPage.titleAssert(), this.validations.checkout.title)
    cy.doType(checkoutPage.firstNameInput(), this.data.checkout.first_name)
    cy.doType(checkoutPage.lastNameInput(), this.data.checkout.last_name)
    cy.doType(checkoutPage.zipCodeInput(), this.data.checkout.postal_code)
    cy.doClick(checkoutPage.continueBtn())

    cy.urlValidator(this.url.checkoutOverview)
    cy.textValidator(checkoutPage.titleAssert(), this.validations.checkout.overviewTitle)
    cartPage.itemCount(3)
    cy.getText(checkoutPage.orderId(), 'orderId') //Guardamos el orderId para futuras validaciones
    checkoutPage.validateSubtotal(['backpackPrice', 'jacketPrice', 'tshirtPrice'])
    checkoutPage.validateTotalWithTax()
    cy.doClick(checkoutPage.finishBtn())

    cy.urlValidator(this.url.checkoutComplete)
    cy.textValidator(checkoutPage.titleAssert(), this.validations.checkout.completeTitle)
    cy.textValidator(checkoutPage.infoMessage(), this.validations.checkout.infoMessage)
    cy.textValidator(checkoutPage.thankYouMessage(), this.validations.checkout.thankYouMessage)
    cy.doClick(checkoutPage.backToHomeBtn())
    cy.urlValidator(this.url.inventory)
  })
})
