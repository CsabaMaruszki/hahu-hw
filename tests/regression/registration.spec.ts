import { RegistrationPage } from '@pages/registration.page';
import { expect, test } from '@playwright/test';
import { getRandomLowercaseString } from '@utils/random.util';

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

  test('Registration process should complete with valid data', async ({ page }) => {
    await test.step('Fill in all registration fields and accept T&C', async () => {
      await registrationPage.nameInput.fill(getRandomLowercaseString(8));

      const email = `${getRandomLowercaseString(8)}@notavaliddomain.com`;
      await registrationPage.emailInput.fill(email);
      await registrationPage.emailConfirmInput.fill(email);

      await registrationPage.selectZipFromDropdown('1024');

      const password = getRandomLowercaseString(8);
      await registrationPage.passwordInput.fill(password);
      await registrationPage.passwordConfirmInput.fill(password);

      await registrationPage.termsCheckbox.click();
    });

    await test.step('Send form and validate success', async () => {
      const responsePromise = page.waitForResponse(
        response => response.url().includes('hasznaltauto.hu/regisztracio') && response.status() === 200,
        { timeout: 10_000 },
      );

      await registrationPage.registrationButton.click();
      await expect(registrationPage.successfulRegistrationText).toBeVisible();

      const response = await responsePromise;

      expect(await response.json()).toEqual({
        statusMessage: 'OK',
        message: 'A regisztráció sikeres. Az aktiváláshoz szükséges információkat elküldtük a megadott e-mail címére.',
        data: [],
      });
    });
  });
});
