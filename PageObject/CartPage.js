class CartPage{

    constructor(page){
        this.page=page;
        this.cartProducts=this.page.locator("div li").first();
        this.checkout=this.page.locator("text=Checkout");

       
    

    }



    async getlocateProduct(productName){

        return this.page.locator("h3:has-text('"+productName+"')");

    }

   async validateProductInCart(productName){
await this.cartProducts.waitFor();
const element=await this.getlocateProduct(productName);
const bool=element.isVisible();
return bool;
    }

    async Checkout(){
        await this.checkout.click();
    }
}





module.exports={CartPage};