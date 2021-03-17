import { pageObjects } from "../PageObjects";

describe("Best Buy", () => {
    const page = new pageObjects();
    beforeEach(async () => {
        await page.navigate();
    });
    test("Searching a product", async () => {
        await page.findElement();
        await page.searchFor("Airpods pro");
        let ResultsSearch = await page.getResultsSearch();
        expect(ResultsSearch).toEqual(ResultsSearch);
    });
    afterAll(async () => {
        await page.driver.quit();
    });
});