import { LoginPage } from '@pages/login.page';
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://www.hasznaltauto.hu/');
  await loginPage.declineCookiesButton.click();
  await loginPage.openLoginModalButton.click();

  await loginPage.usernameInput.fill(process.env.TEST_USER_EMAIL!);
  await loginPage.passwordInput.fill(process.env.TEST_USER_PASSWORD!);
  await loginPage.loginButton.click();

  await expect(loginPage.profileButton).toBeVisible();

  await page.context().storageState({ path: authFile });
});
