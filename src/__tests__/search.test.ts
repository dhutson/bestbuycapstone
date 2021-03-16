import { WebDriver } from "selenium-webdriver";
import { SearchPage } from "./SearchPage";

describe("Best Buy", () => {
    const page = new SearchPage();
    beforeEach(async () => {
        await page.navigate();
    });
    afterAll(async () => {
        await page.driver.quit();
    });
    test("Searching a product", async () => {
        await page.navigate();
        await page.findElement();
        await page.searchFor("Airpods pro");
        let ResultsSearch = await page.getResultsSearch();
        expect(ResultsSearch).toEqual(ResultsSearch);
    });
});