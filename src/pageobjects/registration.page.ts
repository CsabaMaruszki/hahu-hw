import test, { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./common.page";

export class RegistrationPage extends CommonPage {
  constructor(
    readonly page: Page,
    readonly registrationHeader = page.getByRole('heading', { name: 'Regisztráció' }),
    readonly registrationForm = page.getByRole('form', { name: 'Regisztrációs űrlap' }),
    readonly nameInput = page.getByLabel('Név*', { exact: true }),
    readonly emailInput = page.locator('input[name="email"]'),
    readonly zipInput = page.getByLabel('Irányítószám*', { exact: true })
  ) {
    super(page);
  }

  assertErrorIsVisibleForInputField = async (inputFieldLocator: Locator) => {
    await test.step('Expect error message for empty field', async () => {
      const inputContainer = inputFieldLocator.locator('>div');
      await this.registrationHeader.click();
      await expect(inputContainer).toContainText('A mező kitöltése kötelező.');
    });
  }
}
