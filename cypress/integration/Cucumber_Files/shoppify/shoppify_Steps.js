import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { placeOrder } from "../../../support/Page_Object/shoppify_pg"

//let orderId1 = placeOrder.PaymentDetail.order

Given("I am a GOODBUYER", () => {
	// expressions here
	cy.visit("https://nf-test-qe1-env.myshopify.com/")
	cy.get("#password").type("fraygg")
	cy.get("button[type='submit']").click({ force: true })
})

When("I add some items to the cart", () => {
	let uniqueId = Math.floor(Math.random() * 100000)
	const email = "Muneeb" + uniqueId + "@mailinator.com"
	placeOrder.Checkout(email)
})

And(
	"As the ‘goodbuyer’ I place order using a credit card, to create an Order ORDER1",
	() => {
		placeOrder.PaymentDetail()
	}
)

Then("System should have ORDER1 transaction data", function () {
	cy.get(".os-order-number").then($Oid => {
		const Order = $Oid.text()
		const Order_id = Order.replace(/[^0-9]/g, "")
		cy.log("inside Then function" + Order_id)
		cy.wrap(Order_id).as("wrapText")
	})
})

Given("Go to Login", function () {
	// cy.visit("https://dev.simplifyshopping.com/register/");
	// cy.wait(2000);
	cy.log("inside Given function" + this.wrapText)
})

When("Paste variable here", () => {
	console.log("pasting variable here")
	//   cy.wait(2000);
	//   cy.get("#id_password1").type("munnu");
	//   cy.wait("@Orderinfo").then((Orderinfo) => {
	//     console.log(Orderinfo);
	//     cy.get("#id_email").type(Orderinfo);
	//   });
})
