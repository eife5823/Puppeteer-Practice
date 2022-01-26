const puppeteer = require('puppeteer')

const { click, typeText } = require('../../lib/helper')

describe('Login Test', () => {
    let browser
    let page
    
    before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 0,
			devtools: false,
		})
		page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
    })
    
    after(async function () {
		await browser.close()
    })
    
    it('Login Test - Invalid Credentials', async function () {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await click(page, '#signin_button')
        await typeText(page, '#user_login', 'invalid creds')
        await typeText(page, '#user_password', 'invalid password')
        await click(page, '#user_remember_me')
        await click(page, 'input[type="submit"]')
        await page.waitForSelector('.alert-error')
    })

    it('Login Test - Valid Credentials', async function () {
        await page.goto('http://zero.webappsecurity.com/index.html')
		await click(page, '#signin_button')
		await typeText(page, '#user_login', 'username')
		await typeText(page, '#user_password', 'password')
		await click(page, '#user_remember_me')
        await click(page, 'input[type="submit"]')
        await page.waitForSelector('.span12')
    })
})