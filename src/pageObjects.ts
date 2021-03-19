import { WebDriver, until, By, Capabilities, Builder } from "selenium-webdriver";
/**
 * SearchPage is a page object pointing to Best Buy's page.
 * It has methods to navigate there, to enter input and to receive matching results.
 */
export class pageObjects {
    /** the page's driver object */
    driver: WebDriver;
    /** the url for the website */
    url: string = "https://www.bestbuy.com/";
    /** browser */
    browser: "chrome"
    /** the selector for the search bar */
    SearchBar: By = By.css("#gh-search-input");
    /** the selector for the product searched (airpods pro) */
    ResultsSearch: By = By.xpath('//a[text()="Apple - AirPods Pro - White"]');
    /** the selector will close pop up */
    ClosePopUp: By = By.css('button[class="c-close-icon  c-modal-close-icon"]');
    /** The selector for submit search */
    SearchButton: By = By.css('.header-search-icon');
    /** the selector for save items badge */
    SaveItem: By = By.xpath('(//button[@class="save-for-later-save"])[1]');
    /** the selector to go to saved items */
    GoSavedItems: By = By.css('a[href="/site/customer/lists/manage/saveditems"]');
    /** the selector for the airpods in the saved list */
    AirpodsSaved: By = By.css('a[id="skuId-5706659"]');

    constructor (driver?: WebDriver) {
        if (driver) this.driver=driver
        else this.driver = new Builder()
        .withCapabilities(Capabilities.chrome()).build()
    }

    /** will navigate to https://www.bestbuy.com/, close pop up and locate search bar */
    async navigate() {
        await this.driver.get(this.url);
        await this.driver.findElement(this.ClosePopUp).click();
        await this.driver.wait(until.elementLocated(this.SearchBar));
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.SearchBar)));
    }

    /** will find search bar, enter input to search and search */
    async searchFor(searchTerm: string) {
        await this.driver.findElement(this.SearchBar).sendKeys(`${searchTerm}`);
        await this.driver.findElement(this.SearchButton).click();
    }

    async sendKeys(elementBy: By, keys) {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).sendKeys(keys);
    }

    /** will show the results of the search */
    async getResultsSearch() {
        await this.driver.wait(until.elementsLocated(this.ResultsSearch));
    }

    async click(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        return (await this.driver.findElement(elementBy)).click();
    }

    async save() {
        await this.driver.findElement(this.SaveItem).click();
    }

    async savedList() {
        await this.driver.findElement(this.SaveItem).click();
        await this.driver.findElement(this.GoSavedItems).click();
        // await this.driver.findElement(this.AirpodsSaved);
    }

    async getSavedItem() {
        await this.driver.wait(until.elementsLocated(this.AirpodsSaved));
    }

};
