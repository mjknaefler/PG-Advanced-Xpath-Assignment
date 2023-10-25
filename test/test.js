const { expect } = require("chai");
describe('Advanced Xpath test cases', async () =>{
    /**
     * 1. Launch https://www.accuweather.com/ 
     * 2. Verify current-temp is in between 45 and 55
     */
    it('Verify current temp is less than or equals to feel-like temp', async () =>{
        //1. Launch https://www.accuweather.com/ 
        await browser.url('https://www.accuweather.com/');

        //2. Verify current-temp is in between 45 and 55
        const currentLocationTemperatureElement = await $('//span[@class="recent-location-temp"]');
        const currentLocationTemperatureFahrenheit = await currentLocationTemperatureElement.getText();
        const currentLocationTemperatureMeasurement = await currentLocationTemperatureFahrenheit.slice(0,2);
        const verifyWeather = (currentLocationTemperatureMeasurement >= 45 && currentLocationTemperatureMeasurement <= 55);   
        expect(verifyWeather,`Current location weather is not between 45 and 55 fahrenheit, current weather is ${currentLocationTemperatureMeasurement}`).to.be.true;


    })

    it('Verify error on empty login flow', async () => {
        /**
         * 1. Launch https:www.facebook.com/
         * 2. Click 'Log In' button
         * 3. Verify error msg is displayed
         */

        //1. Launch https:www.facebook.com/
        await browser.url('https:www.facebook.com/');

        //2. Click 'Log In' button
        const loginButtonElement = await $('//button[@name="login"]');
        loginButtonElement.click();

        //3. Verify error msg is displayed
        const loginErrorMessageElement = await $('//div[text()="The email or mobile number you entered isn’t connected to an account. "]');
        const loginErrorMessageIsDisplayed = await loginErrorMessageElement.isDisplayed();
        expect(loginErrorMessageIsDisplayed,"Login error message is not displayed").to.be.true;

    })
    it.only('Verify the empty messenger login flow', async () => {
        /**
         * 1. Launch https:www.facebook.com/
         * 2. Click on 'Messenger' link
         * 3. Verify 'Keep me signed in' checkbox is NOT selected
         * 4. Click 'Log In' button
         * 5. Verify link -> "Find your account and log in" is displayed
         * 6. Verify 'Continue' button is enabled
         * 7. Verify 'Keep me signed in' checkbox is NOT selected
         * 8. Click 'Keep me signed in' checkbox
         * 9. Verify 'Keep me signed in' checkbox is selected 
         */

        //1. Launch https:www.facebook.com/
        await browser.url('https:www.facebook.com/');

        //2. Click on 'Messenger' link
        const messengerLinkElement = await $('//a[text()="Messenger"]');
        await messengerLinkElement.click();

        //3. Verify 'Keep me signed in' checkbox is NOT selected
        const keepMeSignedInButtonElement = await $('//input[@type="checkbox"]/following-sibling::span');
        const keepMeSignedInButtonChecked = await keepMeSignedInButtonElement.isSelected();
        expect(!keepMeSignedInButtonChecked,"Keep me signed in checkbox is selected").to.be.true;

        

        //4. Click 'Log In' button
        const loginButtonElement = await $('//button[@id="loginbutton"]');
        await loginButtonElement.click();
        
        //5. Verify link -> "Find your account and log in" is displayed
        const findAccountAndLogInElement = await $('//a[text()="Find your account and log in."]');
        expect(await findAccountAndLogInElement.isDisplayed(),'Find your account and log in is not displayed').to.be.true;
        //6. Verify 'Continue' button is enabled
        const continueButtonElement = await $('//button[text()="Continue"]');
        expect(await continueButtonElement.isEnabled(),'Continue button is not enabled').to.be.true;
        //7. Verify 'Keep me signed in' checkbox is NOT selected
        const keepMeSignedInCheckBoxElement = await $('//input[@type="checkbox"]/following-sibling::span');
        const keepMeSignedInCheckBoxElementIsSelected = await keepMeSignedInCheckBoxElement.isSelected();
        expect(!keepMeSignedInCheckBoxElementIsSelected,'Keep me signed in checkbox is selected').to.be.true;

        //8. Click 'Keep me signed in' checkbox
        await keepMeSignedInCheckBoxElement.click();

        //9. Verify 'Keep me signed in' checkbox is selected 
        const keepMeSignedInCheckBoxElementIsSelectedAfterClick = await $('//input[@type="checkbox"]');
        expect(await keepMeSignedInCheckBoxElementIsSelectedAfterClick.isSelected(),"Keep me signed in checkbox is NOT selected").to.be.true;
    })
})