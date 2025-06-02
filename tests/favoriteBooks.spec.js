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
test('rubriken "Välkommen" visas på katalogsidan', async ({ page }) => {
    // Kontrollera att rubriken syns direkt, utan att klicka på "Katalog"
    await expect(page.getByRole('heading', { name: 'Välkommen' })).toBeVisible({ timeout: 200 });
})

test('när man trycker på en boktitel i katalogen så kan man välja att markera ett ❤️ på den boken, trycker man på ❤️ så ska ett ❤️ vara synligt. Boken ska vara synlig i "Mina böcker". När man avmarkerar en bok och trycker på ❤️ så ska ❤️ försvinna och boken tas den bort från "Mina böcker', async ({ page }) => {
    // Klicka på boktiteln för att visa hjärtat
    await page.getByText('Kaffekokaren som visste för mycket').click();

    // Hitta hjärtat
    const heartButton = page.getByTestId('star-Kaffekokaren som visste för mycket');

    // Kontrollera att hjärtat nu har klassen "star" 
    await expect(heartButton).toHaveClass(/star/);
    await expect(heartButton).not.toHaveClass(/star selected/);

    // Klicka på hjärtat för att markera det
    await heartButton.click();

    // Kontrollera att hjärtat nu har klassen "star selected"
    await expect(heartButton).toHaveClass(/star selected/);
    await expect(heartButton).toBeVisible();

	await page.getByRole('button', {name: 'Mina böcker'}).click({timeout: 500})
	await expect(page.getByText('Dina favoriter:')).toBeVisible({timeout: 500})
	await expect(page.getByText('Kaffekokaren som visste för mycket')).toBeVisible({timeout: 500});

	await page.getByRole('button', {name: 'Katalog'}).click({timeout: 500})

	await heartButton.click(); // Avmarkera hjärtat

	// Kontrollera att hjärtat inte längre har klassen "star selected"
	await expect(heartButton).not.toHaveClass(/star selected/);
	await expect(heartButton).toHaveClass(/star/);

	await page.getByRole('button', {name: 'Mina böcker'}).click({timeout: 500})
	await expect(page.getByText('När du valt,')).toBeVisible({timeout: 500});
});

})