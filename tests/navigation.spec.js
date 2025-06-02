import { test, expect } from '@playwright/test';

test.describe('Läslistan app', () => {
    test.beforeEach(async ({ page }) => {
        // Detta körs före varje test i describe-blocket
        await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/ ')
    })

	test('has title "Läslistan"', async ({ page }) => {
    // Expect a title "to contain" a substring.
    	await expect(page).toHaveTitle(/Läslistan/, {timeout: 500});
})


/*
test('när man trycker på knappen "katalog" så ska rubriken "Välkommen" visas', async ({ page }) => {
	await page.getByRole('button', {name: 'Katalog'}).click({timeout: 500})
	await expect(page.getByRole('heading', { name: 'Välkommen' })).toBeVisible({timeout: 200})

})*/
/*
	test('När man trycker på knappen "Mina böcker" ska listan med dina böcker som du har markerat med ❤️ visas ', async ({ page }) => {
		await page.getByRole('button', {name: 'Mina böcker'}).click({timeout: 500})
		await expect(page.getByText('Dina favoriter:')).toBeVisible({timeout: 500})
	})

})*/


})