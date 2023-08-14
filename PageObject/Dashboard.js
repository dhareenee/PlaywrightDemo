class Dashboard{

    constructor(page){

        this.page=page;
        this.firstProduct=this.page.locator("div.card-body b").nth(0);
        this.lastProduct=this.page.locator("div.card-body b").last();
        this.productsTitle=this.page.locator(".card-body b");
        this.wholeProduct=this.page.locator("div .card-body");
        this.cartButton= this.page.locator("[routerlink*='cart']");

    }


    async searchProductAddtoCart(productName){
        const fpt=await this.firstProduct.textContent();
        const lpt=await this.lastProduct.textContent();
        const title=await this.productsTitle.allTextContents();
        const count=await this.wholeProduct.count();
        for(let i=0;i<count;i++){
            if(await this.wholeProduct.nth(i).locator('b').textContent()===productName){
                await this.wholeProduct.nth(i).locator("text= Add To Cart").click();
   
                break;
               }
        }


    }


    async navigateToCart(){
        await this.cartButton.click();
    }
}

module.exports={Dashboard}






//await page.pause();