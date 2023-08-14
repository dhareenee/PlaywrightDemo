const { expect } = require("@playwright/test");

class CheckoutPage{

    constructor(page){
        this.page=page;
        this.countryLocator=this.page.locator("input[placeholder='Select Country']");
        this.dropdown=this.page.locator(".ta-results");
        this.email=this.page.locator(".user__name [type='text']").first();
        this.submit=this. page.locator(".action__submit");
        this.orderID=this.page.locator("label[class='ng-star-inserted']");
        
    }

    async searchAndSelectCountry(countryNameInput,countryFullName){
        await this.countryLocator.type(countryNameInput)//, { delay: 100 });    
        await this.dropdown.waitFor();    
        
        let optionsCount = await this.dropdown.locator("button").count();    
        
        for (let i = 0; i < optionsCount; ++i) {        
        
        let text = await this.dropdown.locator("button").nth(i).textContent();        
        
        if (text.trim() === countryFullName) {            
        
        await this.dropdown.locator("button").nth(i).click();            
        
        console.log("Country:" + text);            
        
        break;      
        
          } 
   }


    
}

async emailValidation(email){
    const bool=await expect(this.email).toHaveText(email);
    return bool;

}

async submitOrder(){
    await this.submit.click();
}

async getOrderNumber(){
    let orderID=await this.orderID.textContent();
    return orderID;
}

}

module.exports={CheckoutPage};
