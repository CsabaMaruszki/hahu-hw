import { Page } from '@playwright/test';

export class CommonPage {
  constructor(page: Page,
    readonly declineCookiesButton = page.getByText('Folytatás beleegyezés nélkül'),
    readonly profileButton = page.getByTestId('profile-dropdown'),
  ) { }
}
