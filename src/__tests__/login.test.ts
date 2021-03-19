import { pageObjects } from "../PageObjects";
const chromedriver = require("chromedriver");

describe("Best Buy", () => {
    const page = new pageObjects();
    beforeEach(async () => {
        await page.navigate();
    });

    test("Can sign into user account", async () => {
        await page.accountLogin();
        await page.enterEmail("qa@devmountain.com");
        await page.enterPW("QAdevmountain2021!");
        await page.verifySignIn;
    });
    /**test("Error message for sign in with incorrect email", async () => {
        await page.accountLogin();
        await page.enterEmail("qaa@devmountain.com");
        await page.enterPW("QAdevmountain2021!\n");
        expect(await page.errorSignin()).toContain("We didn't find an account with that email address.")
    });
    test("Error message for sign in with incorrect password", async () => {
        await page.accountLogin();
        await page.enterEmail("qa@devmountain.com");
        await page.enterPW("QAdevmountain2021\n");
        expect(await page.errorSignin()).toContain("The password was incorrect.")
    });*/
});