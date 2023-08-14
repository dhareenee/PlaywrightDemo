const{test,expect}=require('@playwright/test');
const{POManager}=require('../PageObject/POManager');
const { CartPage } = require('../PageObject/CartPage');
const dataset=JSON.parse(JSON.stringify(require('../utils/OrderPOTestData.json')));

test.describe.configure({})
for(const data of  dataset){
test(`End-to-End testing for ${data.productName}`,async ({page})=>{


const poManager=new POManager(page);

const loginPage=await poManager.getLoginPage();
await loginPage.goto();
await expect(page).toHaveTitle("Let's Shop");
await loginPage.validUserLogin(data.email,data.password);

const dashboard=await poManager.getDashBoardPage();
await dashboard.searchProductAddtoCart(data.productName);
await dashboard.navigateToCart();


const cartPage=await poManager.getCartPage();
await cartPage.getlocateProduct(data.productName);
const bool=await cartPage.validateProductInCart(data.productName)
expect(bool).toBeTruthy();
await cartPage.Checkout();

const checkoutPage=await poManager.getCheckoutPage();
await checkoutPage.searchAndSelectCountry("ind","India");
const bool1=await checkoutPage.emailValidation(data.email);
//expect(bool1).toBeTruthy();
await checkoutPage.submitOrder();
const orderID=await checkoutPage.getOrderNumber();


const OrderReviewPage=await poManager.getOrderReviewPage();
await OrderReviewPage.clickMyOrder();
await OrderReviewPage.checkforOrderPlaced(orderID);
const orderDetails=await OrderReviewPage.getOrderDetails();
expect(orderDetails.includes(orderID)).toBeTruthy;





//await expect( page.locator(".user__name [type='text']").first()).toHaveText("dhareene98@gmail.com");
 

 //expect(orderDetails.includes(orderID)).toBeTruthy;
 
});
}