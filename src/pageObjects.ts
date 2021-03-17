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
    ResultsSearch: By = By.xpath('//*[@id="shop-sku-list-item-31332248"]/div/div/div[2]/div[1]/div[2]/div/h4/a');
    /** the selector for save items badge */
    SaveItem: By = By.xpath('//*[@id="shop-save-for-later-9b122279-ec4b-4a8a-8bf1-6fac86dca6b0"]/div/div/div/button');
    /** the selector for saved items list */
    SavedItems: By = By.css("button[data-lid='hdr_saved']");
    /** the selector will close pop up */
    ClosePopUp: By = By.css('button[class="c-close-icon  c-modal-close-icon"]');



    constructor (driver?: WebDriver) {
        if (driver) this.driver=driver
        else this.driver = new Builder()
        .withCapabilities(Capabilities.chrome()).build()
        
    }

    /** will navigate to https://www.bestbuy.com/ */
    async navigate() {
        await this.driver.get(this.url);
        await this.driver.findElement(this.ClosePopUp).click();
        await this.driver.wait(until.elementLocated(this.SearchBar));
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.SearchBar)));
    }

    /** will locate the search bar */
    async findElement() {
        await this.driver.wait(until.elementLocated(this.SearchBar));
    }
    /** will click on the search bar */
    async clickSearchBar(){
        await this.driver.wait(until.elementLocated(this.SearchBar));
        await this.click(this.SearchBar);
    }

    /** will click on the Search Bar and enter the search input, hitting enter */
    async searchFor(searchTerm: string) {
        await this.click(this.SearchBar);
        await this.driver.switchTo().activeElement().sendKeys(`${searchTerm}\n`);
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
