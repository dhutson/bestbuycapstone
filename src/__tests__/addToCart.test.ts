import { pageObjects } from "../PageObjects";


describe("Best Buy", () => {
    const page = new pageObjects();
    beforeEach(async () => {
        await page.navigate();
    });
    test("Single Item Transaction", async () => {
        await page.searchFor("Airpods Pro");
    });