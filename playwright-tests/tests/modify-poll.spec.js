import { test, expect } from '@playwright/test';
import { createGroupPoll } from '../helpers/polls-ui';
import { pollPage } from '../selectors/poll-page';

test.describe('Event page', () => {
  test.beforeEach('Create Group poll', async ({ page }) => {
    await page.goto('/');
    const { pollTitle } = await createGroupPoll(page);

    await page.goto('/polls');
    await page.getByRole('heading', { name: pollTitle }).getByRole('link').click();
  });

  test(`Verify that Guest Admin can pause poll`, async ({ page }) => {
    await page.getByRole('button', pollPage.closeButton).click();

    await page.getByRole('button', pollPage.manageButton).click();
    await page.getByRole('menuitem', pollPage.pauseMenuItem).click();
    await page.locator('span').filter({ hasText: pollPage.pausedText }).waitFor();

    await page.locator('div').filter({ hasText: pollPage.closePollButton }).getByRole('link').click();
    await page.getByRole('radio', pollPage.pausedRadioFilter).click();

    await expect(page.getByRole('heading', { level: 2 }).getByRole('link')).toBeVisible();
  });
});