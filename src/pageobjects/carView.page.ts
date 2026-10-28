import { Page } from '@playwright/test';
import { CommonPage } from './common.page';

export class CarViewPage extends CommonPage {
  constructor(page: Page,
    readonly galeryContainer = page.locator('#details-gallery'),
    readonly functionsContainer = page.locator('#details-function-bar'),
    readonly parkButton = functionsContainer.getByRole('button', { name: 'Parkolóba rakom' }),
    readonly toastContainer = page.getByTestId('toast-success'),
    readonly openFullScreenGaleryButton = galeryContainer.getByRole('button', { name: 'Teljes képernyős nagyítás' }),
    readonly fullScreenGaleryContainer = page.locator('#fullScreenGallery'),
    readonly closeFullScreenGaleryButton = fullScreenGaleryContainer.getByRole('button', { name: 'Bezárás' }),
    readonly shareButton = functionsContainer.getByTestId('share-button'),
    readonly shareCopyLinkButton = page.getByTestId('share-copy-link-button'),
  ) {
    super(page);
  }
}
