import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { createGroupPoll, visitParticipantPage } from '../helpers/polls-ui';
import { pollPage } from '../selectors/poll-page';

test.describe('Participant page', () => {
  let newPage;

  test.beforeEach('Visit Participant Poll page', async ({ browser, page }) => {
    await page.goto('/');
    await createGroupPoll(page);
    newPage = await visitParticipantPage(browser, page);
  });

  test(`Verify that Guest Participant can vote and submit availability`, async () => {
    await newPage.getByTestId(pollPage.firstVoteSelectorTestId).first().click();
    await newPage.getByRole('button', pollPage.continueButton).click();

    const firstName = faker.person.firstName();
    await newPage.getByPlaceholder(pollPage.participantNamePlaceholder).fill(firstName);
    await newPage.getByPlaceholder(pollPage.participantEmailPlaceholder).fill(`${firstName}@test.com`);

    // Soft Assertions
    await expect.soft(newPage.getByLabel(pollPage.newParticipantLabel).getByText(pollPage.yesText)).toBeVisible();
    await expect.soft(newPage.getByLabel(pollPage.newParticipantLabel).getByText(pollPage.noText)).toBeVisible();

    await newPage.getByRole('button', pollPage.submitButton).click();

    await expect(newPage.getByText(firstName)).toBeVisible();
    newPage.close();
  });

  test(`Verify that Guest Participant can add comment`, async () => {
    await newPage.getByRole('button', pollPage.leaveCommentButton).click();
    await newPage.getByPlaceholder(pollPage.leaveCommentPlaceholder).fill(faker.lorem.word());
    await newPage.getByPlaceholder(pollPage.yourNamePlaceholder).fill(faker.person.fullName());

    await newPage.getByRole('button', pollPage.addCommentButton).click();

    await expect(newPage.getByRole('heading', pollPage.commentsHeading).locator('div')).toHaveText('1')
  });
});