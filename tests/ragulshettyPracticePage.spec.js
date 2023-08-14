const{test,expect}=require("@playwright/test")


test("Select static dropdown",async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   const radiobutton=  page.locator("input[value='radio1']");
   await radiobutton.click();
    const dropdown=page.locator("#dropdown-class-example");
    await dropdown.selectOption("option2")
    await page.locator("#checkBoxOption2").click();
    
    expect(radiobutton).toBeChecked();
    expect(dropdown).toHaveValue("option2");

    const autoCompelte=page.locator("#autocomplete");
    await autoCompelte.type("Ar");

    await page.locator("#ui-id-1").waitFor();
   const countryList=page.locator(".ui-menu-item");
    const count=await countryList.count();
    for(let i=0;i<count;i++){
       let countryName=await countryList.nth(i).locator("div").textContent();

       if(countryName==="Aruba"){
        await countryList.nth(i).locator("div").click();
        break;
       }
    }

    expect(autoCompelte).toHaveValue("Aruba");

   const openTab=page.locator("#opentab");
    const [newPage] =await Promise.all([
        context.waitForEvent('page'),
        openTab.click(),

    ])

    console.log(newPage.url());


    const displayBox=page.locator("#displayed-text");

   expect (displayBox.isVisible()).toBeTruthy();

   page.locator("#hide-textbox").click();
   expect(displayBox.isHidden()).toBeTruthy();
   page.locator("#show-textbox").click();
   expect(displayBox.isVisible()).toBeTruthy();
   //await page.pause();
   await page.locator("#name").type("Dhareene");
   
   const alertDialogPromise = new Promise((resolve) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(
        "Hello Dhareene, share this practice page and share your knowledge"
      );
      await dialog.accept();
      resolve();
    });
  });

  // Click the button to trigger the alert
  await page.locator("#alertbtn").click();
  await alertDialogPromise; // Wait for the alert dialog to be handled


const framePage=  page.frameLocator("#courses-iframe");
await page.locator("#courses-iframe").scrollIntoViewIfNeeded();
await framePage.locator("li a[href*='lifetime-access']:visible").click();
const textCheck = await framePage.locator('.text h2').textContent()
console.log(textCheck.split(' ')[1])
});

test("mouse hover",async ({page})=>{


await page.goto("https://rahulshettyacademy.com/AutomationPractice");
await page.pause();
await page.locator("#mousehover").hover();
await page.locator("a[href='#top']").click();
console.log( page.url());


});


test("webelement functions",async ({page})=>{
  let sum=0;
  await page.goto("https://rahulshettyacademy.com/AutomationPractice");
 //await page.pause();
 //const listName=  page.locator("table[name='courses'] tbody tr td:nth-child(3)").all();
 //console.log(listName);
 const row = page.locator("table[name='courses'] tbody tr td:nth-child(3)")
const rowTexts = await row.locator(':scope').allInnerTexts()
await rowTexts.forEach((text) => {
 let value=parseInt(text);
 sum=sum+value;
})
console.log(sum);

});


test("Sorted order in the table",async({page})=>{

  await page.goto("https://rahulshettyacademy.com/AutomationPractice");
  const list=page.locator("div[class='tableFixHead'] table[id='product'] tr td:nth-child(1)");
 const listName=await list.allInnerTexts();
 console.log(listName);
const sortOrder=listName.sort();
console.log("-----------------------------------------")
console.log(sortOrder);

expect(listName).toEqual(sortOrder);
});

test("Total comparsion",async ({page})=>{
  let sum=0;
  await page.goto("https://rahulshettyacademy.com/AutomationPractice");
  const list=page.locator("div[class='tableFixHead'] table[id='product'] tr td:nth-child(4)");
 const listName=await list.allInnerTexts();
 await listName.forEach((e)=>{
let IntegerValue=parseInt(e);
sum+=IntegerValue;
 })
 const StringVaue=sum.toString();
 const totalAmount=await page.locator(".totalAmount").textContent();
 expect(StringVaue).toEqual(totalAmount.split(":")[1].trim());
});

test("Print the needed info",async ({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice");
  const list=await page.locator("div[class='tableFixHead'] table[id='product'] tr td:nth-child(3)");
  const listName = await list.allInnerTexts();
const listCount = await list.count();
 
 for(let i=1;i<listCount;i++){
  let stateName=await page.locator("div[class='tableFixHead'] table[id='product'] tr:nth-child("+i+") td:nth-child(3)").innerText();
  if(stateName==="Chennai"){
    let Name=await page.locator("div[class='tableFixHead'] table[id='product'] tr:nth-child("+i+") td:nth-child(1)").innerText();
    console.log(Name);
  }

 }
  
 

});

