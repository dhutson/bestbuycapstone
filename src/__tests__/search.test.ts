import { pageObjects } from "../PageObjects";
const chromedriver = require("chromedriver");

describe("Best Buy", () => {
    const page = new pageObjects();
    beforeEach(async () => {
        await page.navigate();
    });
    test("Searching a product", async () => {
        await page.searchFor("Airpods pro");
        let ResultsSearch = await page.getResultsSearch();
        expect(ResultsSearch).toEqual(ResultsSearch);
    });
    afterAll(async () => {
        await page.driver.quit();
    });
});