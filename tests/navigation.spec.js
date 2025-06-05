import { test, expect } from '@playwright/test';

test.describe('Läslistan app', () => {
    test.beforeEach(async ({ page }) => {
        // Detta körs före varje test i describe-blocket
        await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/ ')
    })


//NAVIGERING: 
test ('kan navigera mellan sidorna och se rätt innehåll', async ({ page }) => {
	//katalogen
	await expect(page.getByText('Hur man tappar bort')).toBeVisible({ timeout: 200 });
	// Gå vidare till "Lägg till bok"
	await page.getByRole('button', { name: 'Lägg till bok'}).click ({ timeout: 200 })
	await expect(page.getByText('Titel')).toBeVisible({ timeout: 200 });
	// Gå vidare till "Mina böcker"
	await page.getByRole('button', { name: 'Mina böcker'}).click ({ timeout: 200 })
	await expect(page.getByText('När du valt')).toBeVisible({ timeout: 200 });
	// Gå tillbaka till katalogen
	await page.getByRole('button', { name: 'Katalog'}).click ({ timeout: 200 })
	await expect(page.getByText('Hur man tappar bort')).toBeVisible({ timeout: 200 });

	})
})