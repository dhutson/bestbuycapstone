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
    ResultsSearch: By = By.css("a[href='/site/apple-airpods-pro-white/5706659.p?skuId=5706659']");

    constructor (driver?: WebDriver) {
        if (driver) this.driver=driver
        else this.driver = new Builder()
        .withCapabilities(Capabilities.chrome()).build()
        
    }

    /** will navigate to https://www.bestbuy.com/ */
    async navigate() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.SearchBar));
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.SearchBar)));
    }

    /** will locate search bar */
    async findElement() {
        await this.driver.wait(until.elementLocated(this.SearchBar));
    }

    /** will click on the Search Bar and enter the search input, hitting enter */
    async searchFor(searchTerm: string) {
        await this.click(this.SearchBar);
        await this.driver.switchTo().activeElement().sendKeys(`${searchTerm}/n`);
        await this.driver.wait(until.elementLocated(this.ResultsSearch));
    }

    /** will show the results of the search */
    async getResultsSearch() {
        await this.driver.wait(until.elementsLocated(this.ResultsSearch));
    }

    async sendKeys(elementBy: By, keys) {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).sendKeys(keys);
    }

    async click(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        return (await this.driver.findElement(elementBy)).click();
    }
};
