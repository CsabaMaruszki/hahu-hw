import { RegistrationPage } from '@pages/registration.page';
import { expect, test } from '@playwright/test';

test.describe('Registration tests', { tag: '@registration' }, () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);

    await page.goto('https://www.hasznaltauto.hu/regisztracio');
    await registrationPage.declineCookiesButton.click();
    await expect(registrationPage.registrationHeader).toBeVisible();
  });

  test('Empty fields should display error message', { tag: '@smoke' }, async () => {
    await test.step('Assert no input for name field results in error message', async () => {
      await registrationPage.nameInput.click();
      await registrationPage.assertErrorIsVisibleForInputField(registrationPage.nameInput);
    });

    await test.step('Assert no input for email field results in error message', async () => {
      await registrationPage.emailInput.click();
      await registrationPage.assertErrorIsVisibleForInputField(registrationPage.emailInput);
    });

    await test.step('Assert no input for zip field results in error message', async () => {
      await registrationPage.zipInput.click();
      await registrationPage.assertErrorIsVisibleForInputField(registrationPage.emailInput);
    });
  });
});
