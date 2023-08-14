const{test,expect}=require('@playwright/test')

test('End-to-End testing',async ({page})=>{
const productName="zara coat 3";
   const wholeProduct=page.locator("div .card-body"); 

await page.goto('https://rahulshettyacademy.com/client');

await page.locator("#userEmail").fill('dhareene98@gmail.com');
await page.locator("#userPassword").type("Dharu@141");
await page.locator("#login").click();
await page.waitForLoadState('networkidle');

await expect(page).toHaveTitle("Let's Shop");
//await page.pause();
const fpt = await page.locator("div.card-body b").nth(0).textContent();
    console.log("fpt " + fpt);
    const lpt = await page.locator("div.card-body b").last().textContent();
    console.log("lpt " + lpt);
const title=await page.locator(".card-body b").allTextContents();
const count=await wholeProduct.count();

for (let i=0;i< count;i++){
   
   if(await wholeProduct.nth(i).locator("b").textContent()===productName){
    
   
    await wholeProduct.nth(i).locator("text= Add To Cart").click();
   
    break;
   }

 
}
await page.locator("[routerlink*='cart']").click();
//await page.pause();

await page.locator("div li").first().waitFor();

const bool=await page.locator("h3:has-text('zara coat 3')").isVisible();
expect(bool).toBeTruthy();

await page.locator("text=Checkout").click();

await page.locator("input[placeholder='Select Country']").type("IND");

const dropdown=page.locator(".ta-results");
await dropdown.waitFor();

 let optionsCount=await dropdown.locator("button").count();

for(let i=0;i<optionsCount;i++){

   let countryName= await dropdown.locator("button span").nth(i).textContent();

   if(countryName===" India"){
    await dropdown.locator("button").nth(i).click();
    break;
   }
}

await expect( page.locator(".user__name [type='text']").first()).toHaveText("dhareene98@gmail.com");
 await page.locator(".action__submit").click();

 //await expect(page.locator(".hero-primary").textContent()).toHaveText(" Thankyou for the order. ");

 let orderID=await page.locator("label[class='ng-star-inserted']").textContent();
 console.log(orderID);
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();

 const listeOrderIds = await page.locator("tr th[scope='row']").all();
for (let i = 0; i < listeOrderIds.length; i++) {
  const orderIdText = await listeOrderIds[i].innerText();
  console.log(orderIdText);
  if(orderID.includes(orderIdText)){
    const viewButton = await page.locator("tr td button.btn-primary").nth(i);
    await viewButton.click();
    break;
  }
}

 const orderDetails=await page.locator(".col-text.-main").textContent();

 expect(orderDetails.includes(orderID)).toBeTruthy;
 
});