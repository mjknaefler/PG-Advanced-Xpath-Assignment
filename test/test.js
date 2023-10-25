const { expect } = require("chai");
describe('Advanced Xpath test cases', async () =>{
    /**
     * 1. Launch https://www.accuweather.com/ 
     * 2. Verify current-temp is in between 45 and 55
     */
    it.only('Verify current temp is less than or equals to feel-like temp', async () =>{
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

    })
})