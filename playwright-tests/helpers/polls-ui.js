import { pollPage } from '../selectors/poll-page';
import { faker } from '@faker-js/faker';

const todayDateNumber = new Date().getDate();

/**
 * Creates a group poll
 *
 * @param {import('@playwright/test').Page} page - The Playwright page object
 * @param {string} pollTitle - The title of the poll to be created (generated dynamically if not provided).
 * @returns {Promise<{pollTitle: string}>} - Resolves when the poll is successfully created and the invite link is validated.
 */
export async function createGroupPoll(page, pollTitle = faker.word.noun()) {
  await page.getByRole('navigation').getByRole('link', pollPage.navigationCreateLink).click();

  await page.getByPlaceholder(pollPage.pollTitlePlaceholder).fill(pollTitle);

  await page.getByRole('button', pollPage.dateButton(todayDateNumber)).click();
  await page.getByTestId(pollPage.specifyTimesSwitch).click();
  await page.getByRole('button', pollPage.addTimeOptionButton).click();

  await page.getByRole('button', pollPage.createPollButton).click();
  await page.getByTestId(pollPage.inviteLinkTestId).waitFor();

  return { pollTitle };
}

/**
 * Visits the participant page using the invite link
 *
 * @param {import('@playwright/test').Browser} browser - The Playwright browser object to create a new context and page.
 * @param {import('@playwright/test').Page} page - The current page object to extract the invite link.
 * @returns {Promise<Page>} - Resolves when the new page navigates to the participant page.
 */
export async function visitParticipantPage(browser, page) {
  const inviteLink = await page
    .getByRole('button')
    .filter({ hasText: /[a-zA-Z0-9.:]+\/invite\/[A-Za-z0-9]+/ })
    .textContent();

  if (!inviteLink) {
    throw new Error('Invite link not found or invalid.');
  }

  const context = await browser.newContext();
  const newPage = await context.newPage();

  // Extract only the `/invite/...` part of the link
  await newPage.goto(inviteLink.match(/\/invite\/[A-Za-z0-9]+/).toString());

  return newPage;
}