import { test, expect } from '@playwright/test';
import { createGroupPoll, visitParticipantPage } from '../helpers/polls-ui';
import { pollPage } from '../selectors/poll-page';
import { voteWithParticipantViaAPI } from '../setup/commands/add-participants';

test.describe.serial('Participant page', () => {
  let newPage;

  test.beforeEach('Visit Participant Poll page and add Vote', async ({ browser, page, request }) => {
    await page.goto('/');
    await createGroupPoll(page);
    newPage = await visitParticipantPage(browser, page);

    await voteWithParticipantViaAPI(newPage, request);
  });

  test.afterEach('Close New page', async () => {
    newPage.close();
  })

  test(`Verify that Guest Participant edit vote`, async () => {
    await newPage.getByTestId(pollPage.participantMenuTestId).click();
    await newPage.getByText(pollPage.editVotesOption).click();

    await newPage.getByTestId(pollPage.voteSelectorTestId).nth(1).click();
    await newPage.getByRole('button', pollPage.saveButton).click();
    await newPage.getByRole('button', pollPage.saveButton).waitFor({ state: 'hidden'});

    await expect(newPage.getByText(pollPage.voteCount, { exact: true }).nth(1)).toBeVisible();
  });

  test(`Verify that Guest Participant can rename voter`, async () => {
    await newPage.getByTestId(pollPage.participantMenuTestId).click();
    await newPage.getByText(pollPage.changeNameOption).click();

    await newPage.getByLabel(pollPage.nameInputText, { exact: true }).fill('Test');
    await newPage.getByRole('button', pollPage.saveButton).click();

    await expect(newPage.getByText('Test')).toBeVisible();
  });

  test(`Verify that Guest Participant can delete voter`, async () => {
    await newPage.getByTestId(pollPage.participantMenuTestId).click();
    await newPage.getByRole('menuitem', pollPage.deleteOption).click();

    await newPage.getByLabel(pollPage.deleteConfirmationLabel).waitFor();
    await newPage.getByRole('button', pollPage.confirmDeleteButton).click();

    await expect(newPage.getByText(pollPage.noParticipantsText)).toBeVisible();
  });
});