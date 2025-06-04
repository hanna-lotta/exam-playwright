import { test, expect } from '@playwright/test';

test.describe('Läslistan app', () => {
    test.beforeEach(async ({ page }) => {
        // Detta körs före varje test i describe-blocket
        await page.goto('https://tap-ht24-testverktyg.github.io/exam-template/ ')
    })


//NAVIGERING: 
test ('Bekräfta att förstasidan är katalogen och att första boken visas. Gå vidare till "Lägg till bok" och bekräfta att rubriken "Välkommen" visas. Gå vidare till "Mina böcker" och bekräfta att rubriken "Välkommen" visas. Gå tillbaka till katalogen och bekräfta att första boken visas igen', async ({ page }) => {
	
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