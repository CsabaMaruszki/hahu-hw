import { CarViewPage } from '@pages/carView.page';
import { expect, test } from '@playwright/test';
import { verifyAdvertTitle } from '@steps/carView.steps';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Car view tests', { tag: '@carView' }, () => {
  const advertUrl = 'https://www.hasznaltauto.hu/szemelyauto/ford/puma/ford_puma_1.0_ecoboost_mhev_titanium_dct_2024_modell_ecoboost_hybrid_ford_petranyi-20604181';
  const advertTitle = 'FORD PUMA 1.0 EcoBoost mHEV Titanium DCT';
  let carViewPage: CarViewPage;

  test.beforeEach(async ({ page }) => {
    carViewPage = new CarViewPage(page);

    await page.goto(advertUrl);
    await carViewPage.declineCookiesButton.click();
    await verifyAdvertTitle(page, advertTitle);
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

  test('Share link is copied to clipboard', { tag: ['@smoke', '@share'] }, async ({ context, page }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    expect(await page.evaluate(() => navigator.clipboard.readText()), 'Evaluate clipboard is empty').toEqual('');

    await carViewPage.shareButton.click();
    await carViewPage.shareCopyLinkButton.click();
    expect(await page.evaluate(() => navigator.clipboard.readText()), 'Evaluate clipboard contains share link').toEqual(advertUrl);
  });
});
