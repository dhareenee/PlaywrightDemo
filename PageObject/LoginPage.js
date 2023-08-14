class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signButton = page.locator("#login");

    }


    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validUserLogin(email,password) {
        await this.userName.fill(email);
        await this.password.type(password);
        await this.signButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports={LoginPage};



