const{test,expect,request}=require("@playwright/test")
const payLoad={
grant_type:"password",
client_id:"dd03cdb94fd431103f2db183a1f0c7b9",
client_secret:"b<J7WCil$",
username:"admin",
password:"OS3Gg@fkYo*6",
}

test("Getting the session ID",async({request})=>{

    const apiContext=await request.newContext();
    const loginResponse=await apiContext.post("https://dev127556.service-now.com/oauth_token.do",
    {
        data:payLoad
    }

    )
expect(loginResponse.ok()).toBeTruthy();
const loginResponseJson=await loginResponse.json();
const token=loginResponseJson.access_token;
console.log(token);


});