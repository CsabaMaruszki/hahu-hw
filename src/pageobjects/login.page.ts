import { Page } from '@playwright/test';
import { CommonPage } from './common.page';

export class LoginPage extends CommonPage {
  constructor(page: Page,
    readonly openLoginModalButton = page.getByTestId('login-button'),
    readonly usernameInput = page.getByLabel('E-mail cím vagy felhasználónév'),
    readonly passwordInput = page.getByLabel('Jelszó'),
    readonly loginButton = page.getByRole('button', { name: 'Bejelentkezés' }),
  ) {
    super(page);
  }
}
