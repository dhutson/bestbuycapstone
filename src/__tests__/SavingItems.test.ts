import { pageObjects } from "../PageObjects";

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
    afterAll(async () => {
        await page.driver.quit();
    });
});