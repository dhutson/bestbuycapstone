import { pageObjects } from "../PageObjects";
const chromedriver = require("chromedriver");

describe("Best Buy", () => {
    const page = new pageObjects();
    beforeEach(async () => {
        await page.navigate();
    });

    test("Can view top deals", async () => {
        await page.viewDeals();
        let topDealsHdr = await page.verifyDeals();
        expect(topDealsHdr).toEqual(topDealsHdr);
    });
});