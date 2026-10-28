import { CarViewPage } from '@pages/carView.page';
import { expect, test } from '@playwright/test';
import { verifyAdvertTitle } from '@steps/carView.steps';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Car view tests', { tag: '@carView' }, () => {
  let carViewPage: CarViewPage;

  test.beforeEach(async ({ page }) => {
    carViewPage = new CarViewPage(page);

    await page.goto('https://www.hasznaltauto.hu/szemelyauto/ford/puma/ford_puma_1.0_ecoboost_mhev_titanium_dct_2024_modell_ecoboost_hybrid_ford_petranyi-20604181');
    await carViewPage.declineCookiesButton.click();
    await verifyAdvertTitle(page, 'FORD PUMA 1.0 EcoBoost mHEV Titanium DCT');
  });

  test('Add car to car park', { tag: ['@smoke', '@park'] }, async () => {
    await carViewPage.parkButton.click();
    await expect(carViewPage.toastContainer).toContainText('A jármű parkolóba helyezése sikeres.');
  });

  test('Full screen galery opens and closes', { tag: ['@smoke', '@galery'] }, async () => {
    await test.step('Full screen galery opens', async () => {
      await carViewPage.openFullScreenGaleryButton.click();
      await expect(carViewPage.fullScreenGaleryContainer).toBeVisible();
    });

    await test.step('Full screen galery closes', async () => {
      await carViewPage.closeFullScreenGaleryButton.click();
      await expect(carViewPage.fullScreenGaleryContainer).toBeHidden();
    });
  });
});
