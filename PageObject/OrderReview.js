class OrderReview{


    constructor(page){
        this.page=page;
        this.myOrders=this.page.locator("button[routerlink*='myorders']");
        this.ordersTable = page.locator("tbody");
this.rows = page.locator("tbody tr");
this.orderdIdDetails =page.locator(".col-text");

    }

    async clickMyOrder(){
        await this.myOrders.click();
        
    }

    async checkforOrderPlaced(orderID){
      await this.ordersTable.waitFor();
      for(let i =0; i<await this.rows.count(); ++i)
       {
          const rowOrderId =await this.rows.nth(i).locator("th").textContent();
          if (orderID.includes(rowOrderId))
          {
              await this.rows.nth(i).locator("button").first().click();
              break;
          }

    }

}
 async getOrderDetails(){
  return await this.orderdIdDetails.textContent();
    
 }


 
}

module.exports={OrderReview};

 