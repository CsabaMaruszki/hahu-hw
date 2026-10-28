import { Page } from '@playwright/test';
import { CommonPage } from './common.page';

export class CarViewPage extends CommonPage {
  constructor(page: Page,
    readonly galeryContainer = page.locator('.details-gallery'),
    readonly functionsContainer = page.locator('#details-function-bar'),
    readonly parkButton = functionsContainer.getByRole('button', { name: 'Parkolóba rakom' }),
    readonly toastContainer = page.getByTestId('toast-success'),
  ) {
    super(page);
  }
}
