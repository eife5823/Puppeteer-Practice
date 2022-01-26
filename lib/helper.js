module.exports = {
	click: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			await page.click(selector)
		} catch (error) {
			throw new Error(`Could not click on selector: ${selector}`)
		}
	},
	getText: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			return await page.$eval(selector, element => element.innerHTML)
		} catch (error) {
			throw new Error(`Can't get text from selector: ${selector}`)
		}
	},
	getCount: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			return await page.$$eval(selector, element => element.length)
		} catch (error) {
			throw new Error(`Can't get count of selector: ${selector}`)
		}
	},
	typeText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector)
			await page.type(selector, text)
		} catch (error) {
			throw new Error(`could not type into selector: ${selector}`)
		}
	},
	waitForText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector)
			await page.waitForFunction((selector, text) => {
				document.querySelector(selector).innerHTML.includes(text),
					{},
					selector,
					text
			})
		} catch (error) {
			throw new Error(`${text} not found for ${selector}`)
		}
	},
	shouldNotExist: async function (page, selector) {
		try {
			await page.waitForSelector(selector, { hidden: true })
		} catch (error) {
			throw new Error(`${selector} is visible, but should not be`)
		}
	},
}
