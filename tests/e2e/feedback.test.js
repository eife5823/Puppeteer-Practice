const puppeteer = require('puppeteer')
const { expect } = require('chai')

const { click, typeText } = require('../../lib/helper')

describe('Feedback Test', () => {
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
    
    it('Display Feedback Form', async function () {
		await page.goto('http://zero.webappsecurity.com/index.html')
		await click(page, '#feedback')
    })
    
    it('Submit Feedback Form', async function () {
		await typeText(page, '#name', 'Name')
		await typeText(page, '#email', 'Email')
		await typeText(page, '#subject', 'Subject')
		await typeText(page, '#comment', 'Comment')
		await click(page, 'input[type="submit')
    })
    
    it('Display Result Page', async function () {
        await page.waitForSelector('#feedback-title')
        const url = await page.url()
        expect(url).to.include('/sendFeedback.html')
	})

})