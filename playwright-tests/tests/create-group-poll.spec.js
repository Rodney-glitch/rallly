import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { pollPage } from '../selectors/poll-page';
import { createGroupPoll } from '../helpers/polls-ui';

test.describe('Create Group Poll', () => {
  const todayDateNumber = new Date().getDate();

  test.beforeEach('Visit Rallly Home page', async ({ page }) => {
    await page.goto('/');
  });

  test(`Verify that Guest Admin can create a group poll successfully`, async ({page}) => {
    await page.getByRole('navigation').getByRole('link', pollPage.navigationCreateLink).click();

    await page.getByPlaceholder(pollPage.pollTitlePlaceholder).fill(faker.word.noun());
    await page.getByPlaceholder(pollPage.locationPlaceholder).fill(faker.location.streetAddress());
    await page.getByPlaceholder(pollPage.descriptionPlaceholder).fill(faker.lorem.word());

    await page.getByRole('button', pollPage.dateButton(todayDateNumber)).click();
    await page.getByTestId(pollPage.specifyTimesSwitch).click();
    await page.getByRole('button', pollPage.addTimeOptionButton).click();

    await page.getByLabel(pollPage.disableCommentsToggle).click();

    await page.getByRole('button', pollPage.createPollButton).click();

    await expect(page.getByTestId(pollPage.inviteLinkTestId)).toBeVisible();

    await page.getByRole('button', pollPage.closeButton).click();
    await expect(page.getByText(pollPage.liveText)).toBeVisible();
  });

  test(`Verify that Guest Admin can create a group poll without Optional fields`, async ({page}) => {
    await createGroupPoll(page);

    await expect(page.getByTestId(pollPage.inviteLinkTestId)).toBeVisible();
  });
});