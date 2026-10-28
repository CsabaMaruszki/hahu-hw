import { expect, type Page } from '@playwright/test';

export const verifyAdvertTitle = async (page: Page, adTitle: string) => {
  await expect(page.getByRole('heading', { name: adTitle })).toBeVisible();
};
