///<reference types="Cypress" />

export class ShoppifyOrder {
	constructor(Order_id) {
		this.Order_id = Order_id
	}

	Checkout(email) {
		cy.contains("Shop all").click()
		cy.get(".card-wrapper").eq(0).click()
		cy.get(".product-form__submit").click()
		//	cy.get("#cart-notification-button").click({ force: true })
		cy.get("#cart-notification-form").click()

		cy.get("form").then(userForm => {
			cy.wrap(userForm).find("#checkout_email_or_phone").type(email)
			cy.wrap(userForm)
				.find("#checkout_shipping_address_last_name")
				.type("Akhtar")
			cy.wrap(userForm)
				.find("#checkout_shipping_address_address1")
				.type("23A Westbourne")
			cy.wrap(userForm).find("#checkout_shipping_address_city").type("London")
			cy.wrap(userForm).find("select").eq(2).select("AK")
			cy.wrap(userForm).find("#checkout_shipping_address_zip").type("99599")
			cy.wrap(userForm).find("#continue_button").click()
		})

		cy.get("#continue_button", { timeout: 10000 }).should("be.enabled").click()
	}

	PaymentDetail() {
		cy.wait(8000)

		cy.get(".card-fields-iframe").within($iFrame => {
			const iframecontent = $iFrame.contents().eq(0).find("input")
			cy.wrap(iframecontent)
				.eq(0)
				.click({ force: true })
				.type("4242424242424242", { force: true })

			cy.wrap(iframecontent)
				.eq(1)
				.click({ force: true })
				.type("Muneeb", { force: true })

			cy.wrap(iframecontent)
				.eq(2)
				.click({ force: true })
				.type("12", { force: true })

			cy.wrap(iframecontent)
				.eq(3)
				.click({ force: true })
				.type("2022", { force: true })

			cy.wrap(iframecontent)
				.eq(5)
				.click({ force: true })
				.type("243", { force: true })
		})
		cy.contains("span", "Pay now").click({ force: true })
		cy.contains("a", "View order confirmation ›", { timeout: 10000 })
			.should("be.visible")
			.click()
	}

	getOrderData() {
		cy.get(".os-order-number").then($Oid => {
			var id = $Oid.text()
			id = id.replace(/[^0-9]/g, "")
			return id
		})
		// cy.wait(3000);
		// console.log("this wala data " + this.Order_id);
		// cy.wait("@Ordersinfo");
		//cy.get("@Ordersinfo").then((id1) => {
		//cy.log("this wala data" + id);
		// cy.log("this wala data" + Head);
	}

	PassingData() {
		const val10 = this.getOrderData()
		console.log("console" + val10)
		cy.log("cy stuff" + val10)
		//cy.get("#id_email").type(this.Order_id);
		//console.log("Hello World");
		console.log("Pakistan passing data " + this.Order_id)
	}
}
export const placeOrder = new ShoppifyOrder()
