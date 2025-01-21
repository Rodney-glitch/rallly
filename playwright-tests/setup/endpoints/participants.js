import { expect } from '@playwright/test';

/**
 * Fetches poll details and extracts the poll ID and option IDs.
 *
 * @param {string} urlId - The unique URL ID for the poll.
 * @param {string} sessionToken - The session token for authentication.
 * @param {import('@playwright/test').APIRequestContext} request - The Playwright request object to create a request context.
 * @returns {Promise<{ pollId: string, optionIds: string[] }>} - An object containing the poll ID and an array of option IDs.
 */
export async function fetchPollDetails(urlId, sessionToken, request) {
  const url = '/api/trpc/polls.get';
  const params = {
    batch: 1,
    input: JSON.stringify({ 0: { json: { urlId } } }),
  };

  const response = await request.get(url, {
    params,
    headers: {
      cookie: `next-auth.session-token=${sessionToken}`
    }
  });

  await expect(response).toBeOK();

  const responseBody = await response.json();
  const pollData = responseBody[0]?.result?.data?.json;

  if (!pollData) {
    throw new Error('Poll data is missing in the response.');
  }

  const pollId = pollData.id;
  const optionIds = pollData.options.map(option => option.id);

  return { pollId, optionIds };
}

/**
 * Adds a participant to a poll via the API.
 *
 * @param {import('@playwright/test').APIRequestContext} request - The Playwright request object to create a request context.
 * @param {Object} params - Parameters for the API request.
 * @param {string} params.sessionToken - The session token for authentication.
 * @param {string} params.pollId - The ID of the poll to which the participant is being added.
 * @param {Array} params.votes - Array of vote objects with `optionId` and `type` values.
 * @param {string} params.name - Name of the participant.
 * @param {string} params.email - Email of the participant.
 * @returns {Promise<Object>} - The response from the API.
 */
export async function addParticipantToPoll(request, params) {
  const { sessionToken, pollId, votes, name, email } = params;
  const apiUrl = '/api/trpc/polls.participants.add?batch=1';

  const response = await request.post(apiUrl, {
    headers: {
      cookie: `next-auth.session-token=${sessionToken}`
    },
    data: {
      "0": {
        json: {
          name,
          votes,
          email,
          pollId,
        },
      },
    }
  });

  await expect(response).toBeOK();

  return await response.json();
}
