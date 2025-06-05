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

test('kan favoritmarkera och avmarkera en bok samt se uppdaterad lista i "Mina böcker"', async ({ page }) => { 
    // Klicka på boktiteln för att visa hjärtat
	await page.getByText('Hur man tappar bort').click();
    await page.getByText('Kaffekokaren som visste för mycket').click();
	

    // Hitta hjärtat
    const heartButton = page.getByTestId('star-Kaffekokaren som visste för mycket');
	const heartButton2 = page.getByTestId('star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen');

    // Kontrollera att hjärtat nu har klassen "star" 
    await expect(heartButton).toHaveClass(/star/);
    await expect(heartButton).not.toHaveClass(/star selected/);
	await expect(heartButton).toHaveCSS('opacity', '0.65')
	await expect(heartButton2).toHaveClass(/star/);
	await expect(heartButton2).not.toHaveClass(/star selected/);
	await expect(heartButton).toHaveCSS('opacity', '0.65')

    // Klicka på hjärtat för att markera det
    await heartButton.click();
	await heartButton2.click();

    // Kontrollera att hjärtat nu har klassen "star selected"
    await expect(heartButton).toHaveClass(/star selected/);
	await expect(heartButton).toHaveCSS('opacity', '1');
    await expect(heartButton).toBeVisible();
	await expect(heartButton2).toHaveClass(/star selected/);
	await expect(heartButton2).toHaveCSS('opacity', '1');
	await expect(heartButton2).toBeVisible();

	// Kontrollera att boken nu är synlig i "Mina böcker"
	await page.getByRole('button', {name: 'Mina böcker'}).click({timeout: 500})
	await expect(page.getByText('Dina favoriter:')).toBeVisible({timeout: 500})
	await expect(page.getByText('Hur man tappar bort')).toBeVisible({timeout: 500});
	await expect(page.getByText('Kaffekokaren som visste för mycket')).toBeVisible({timeout: 500});
	// Gå tillbaka till katalogen
	await page.getByRole('button', {name: 'Katalog'}).click({timeout: 500})

	await heartButton.click(); // Avmarkera hjärtat
	await heartButton2.click(); // Avmarkera hjärtat

	// Kontrollera att hjärtat inte längre har klassen "star selected"
	await expect(heartButton).not.toHaveClass(/star selected/);
	await expect(heartButton).toHaveClass(/star/);
	await expect(heartButton2).not.toHaveClass(/star selected/);
	await expect(heartButton2).toHaveClass(/star/);
	// Kontrollera att boken inte längre är synlig i "Mina böcker"
	await page.getByRole('button', {name: 'Mina böcker'}).click({timeout: 500})
	await expect(page.getByText('När du valt,')).toBeVisible({timeout: 500});
});

})