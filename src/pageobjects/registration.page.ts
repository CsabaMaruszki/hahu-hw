import test, { expect, Locator, Page } from '@playwright/test';
import { CommonPage } from './common.page';

export class RegistrationPage extends CommonPage {
  constructor(
    readonly page: Page,
    readonly registrationHeader = page.getByRole('heading', { name: 'Regisztráció' }),
    readonly registrationForm = page.getByRole('form', { name: 'Regisztrációs űrlap' }),
    readonly nameInput = registrationForm.getByLabel('Név*', { exact: true }),
    readonly emailInput = registrationForm.locator('input[name="email"]'),
    readonly emailConfirmInput = registrationForm.locator('input[name="confirmEmail"]'),
    readonly zipInput = registrationForm.getByLabel('Irányítószám*', { exact: true }),
    readonly passwordInput = registrationForm.getByLabel('Belépési jelszó*', { exact: true }),
    readonly passwordConfirmInput = registrationForm.getByLabel('Belépési jelszó újra*', { exact: true }),
    readonly termsCheckbox = registrationForm.getByRole('checkbox', { name: 'Elolvastam és elfogadom' }),
    readonly registrationButton = registrationForm.getByTestId('submit-button'),
    readonly successfulRegistrationText = page.getByText('Sikeres regisztráció!'),
  ) {
    super(page);
  }

  assertErrorIsVisibleForInputField = async (inputFieldLocator: Locator) => {
    await test.step('Expect error message for empty field', async () => {
      const inputContainer = inputFieldLocator.locator('>div');
      await this.registrationHeader.click();
      await expect(inputContainer).toContainText('A mező kitöltése kötelező.');
    });
  };

  selectZipFromDropdown = async (zip: string) => {
    await test.step(`Select ${zip} zip number`, async () => {
      await this.zipInput.fill(zip);
      const dropdownItem = this.page.locator('li').filter({ hasText: zip });
      await dropdownItem.click();
      await expect(this.zipInput).toHaveValue(new RegExp(zip));
    });
  };
}
