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
    
    /** selector to add Saved Item to cart */
    savedAdd: By = By.css('#fulfillment-add-to-cart-button-30463462');
    savedHdr: By = By.css('button[data-lid="hdr_saved"]');
    
    /**Selectors for Cart and Checkout */
    airPodsPro: By = By.css('fulfillment-add-to-cart-button-91963914')
    goToCart: By = By.css('.go-to-cart-button');
    checkOut: By = By.css('.checkout-buttons__checkout');
    contPmt: By = By.css('.button--continue');
    placeOrder: By = By.css('.button--place-order');

    /** Selectors for viewing deals page */
    topDealsLink: By = By.css('a[data-lid="hdr_td_topdeals"]')
    topDealsHdr: By = By.css('.cn-deals-text')

    /**Selectors for account login */
    accountHdr: By = By.css('button[data-lid="hdr_signin"]');
    /**Sign in button */
    signIn: By = By.css('a[class="lam-signIn__button btn btn-secondary"]');
    /** Email address field */
    emailInput: By = By.css('#fld-e');
    /** Account password field */
    pwInput: By = By.css('#fld-p1');
    /** Signed in account header */
    signedInHdr: By = By.css('#account-tab');
    /** Account home button */
    accountHome: By = By.xpath('//a[text()="Account Home"][1]');
    /** Account overview card */
    accountOV: By = By.css('.rewards-overview-card');
    /** Sumbit button on sign in page */
    submitButton: By = By.css("[type='submit']");

    /** Invalid email or password entered - error message alert */
    errorLogin: By = By.css('.c-alert-icon');
    
    

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

    async addSavedToCart() {
        await this.driver.findElement(this.GoSavedItems).click();
        await this.driver.findElement(this.savedAdd).click();
    }

    async addToCart() {
        await this.driver.findElement(this.airPodsPro).click();

    }
    async checkoutCart() {
        await this.driver.findElement(this.goToCart).click();
        await this.driver.findElement(this.checkOut).click();
        await this.driver.findElement(this.contPmt).click();
        await this.driver.wait(until.elementLocated(this.placeOrder));
    }
    
    //Select and enter email address for account login
    async accountLogin() {
        await this.driver.findElement(this.accountHdr).click();
        await this.driver.findElement(this.signIn).click();

    }
    async enterEmail(email: string) {
        await this.driver.findElement(this.emailInput).click();
        await this.driver.switchTo().activeElement().sendKeys(`${email}`);
        await this.driver.wait(until.elementLocated(this.emailInput));
    }
    async enterPW(password: string) {
        await this.driver.findElement(this.pwInput).click();
        await this.driver.switchTo().activeElement().sendKeys(`${password}\n`);
    }
    async verifySignIn() {
        await this.driver.findElement(this.signedInHdr).click();
        await this.driver.findElement(this.accountHdr).click();
        await this.driver.wait(until.elementLocated(this.accountOV));
    }
    async errorSignin() {
        await this.driver.wait(until.elementLocated(this.errorLogin));
        let errorMessage = await (await this.driver.findElement(this.errorLogin)).getText()
        console.log(errorMessage);
        return errorMessage;
    }
   
    //View top deals
    async viewDeals() {
        await this.driver.findElement(this.topDealsLink).click();
        await this.driver.wait(until.elementLocated(this.topDealsHdr));
    } 
    async verifyDeals() {
        await this.driver.wait(until.elementsLocated(this.topDealsHdr));
    }
}