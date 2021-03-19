
import { pageObjects } from "../PageObjects";
const chromedriver = require("chromedriver");

describe("Best Buy", () => {
    const page = new pageObjects();
    beforeEach(async () => {
        await page.navigate();
    });
    
    test("Saving an item", async () => {
       await page.searchFor("Airpods pro");
       let ResultsSearch = await page.getResultsSearch();
       expect(ResultsSearch).toEqual(ResultsSearch);
       await page.save();
       await page.savedList();
       let AirpodsSaved = await page.getSavedItem();
       expect(AirpodsSaved).toEqual(AirpodsSaved);
    });               
    
    /**test("Add Saved item to cart from signed in account", async () => {
        await page.accountLogin();
        await page.enterEmail("qa@devmountain.com");
        await page.enterPW("QAdevmountain2021!");
        await page.addSavedToCart();
        await page.checkoutCart();       
    });*/

    afterAll(async () => {
        await page.driver.quit();
    });
});