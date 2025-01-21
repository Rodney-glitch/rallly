import { addParticipantToPoll, fetchPollDetails } from '../endpoints/participants';
import { faker } from '@faker-js/faker';

/**
 * This command is to vote with a participant via API
 *
 * @param {import('@playwright/test').Page} page - The Playwright page object
 * @param {import('@playwright/test').APIRequestContext} request - The Playwright request object to create a request context.
 * @returns {Promise<void>}
 */
export async function voteWithParticipantViaAPI(page, request) {
  await page.waitForLoadState('networkidle');
  const cookies = await page.context().cookies();

  const sessionCookie = cookies.find(cookie => cookie.name.includes('session-token'));

  const pathParts = page.url().toString().split('/');
  const inviteId = pathParts[pathParts.length - 1];

  const { pollId, optionIds } = await fetchPollDetails(inviteId, sessionCookie.value, request)

  let params = {
    sessionToken: sessionCookie.value,
    pollId: pollId,
    votes: [
      {
        optionId: optionIds[0],
        type: 'yes'
      },
      {
        optionId: optionIds[1],
        type: 'no'
      }
    ],
    name: faker.person.firstName(),
    email: `${faker.person.firstName()}@test.com`,
  }

  await addParticipantToPoll(request, params);
  await page.reload();
}