import { test, expect } from '@playwright/test';


test.describe('Läslistan app', () => {
	test.beforeEach(async ({ page }) => {
		// Detta körs före varje test i describe-blocket
		await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/ ')
	})

	test('kan lägga till en bok i katalogen via formuläret', async ({ page }) => {
		// Gå till "Lägg till bok" sidan
		await page.getByRole('button', {name: 'Lägg till bok'}).click({timeout: 500})
		// Fyll i formulär
		const title = 'Astrid Lindgren'
		const author = 'Mio, min Mio'

		await page.getByTestId('add-input-title').fill(title, {timeout: 500})
		await page.getByTestId('add-input-author').fill(author, {timeout: 500})
		// Lägg till boken
		await page.getByRole('button', {name: 'Lägg till ny bok'}).click({timeout: 500})
		// Bekräfta att boken har lagts till i katalogen
		await page.getByRole('button', {name: 'Katalog'}).click({timeout: 500})
		await expect(page.getByText(title)).toBeVisible({timeout: 500})
		await expect(page.getByText(author)).toBeVisible({timeout: 500})

	})



})
