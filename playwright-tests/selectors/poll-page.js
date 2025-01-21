export const pollPage = {
  // Create Poll
  navigationCreateLink: { name: 'Create' },
  pollTitlePlaceholder: 'Monthly Meetup',
  locationPlaceholder: "Joe's Coffee Shop",
  descriptionPlaceholder: 'Hey everyone, please',
  monthSelectorText: 'January',
  todayButton: { role: 'button', name: 'Today' },
  dateButton: (date) => ({ name: String(date) }),
  specifyTimesSwitch: 'specify-times-switch',
  addTimeOptionButton: { name: 'Add time option' },
  disableCommentsToggle: 'Disable comments',
  createPollButton: { name: 'Create poll' },
  inviteLinkTestId: 'invite-participant-dialog',
  closeButton: { name: 'Close' },
  liveText: 'Live',

  // Participant Poll
  continueButton: { name: 'Continue' },
  firstVoteSelectorTestId: 'vote-selector',
  leaveCommentButton: { name: 'Leave a comment on this poll' },
  participantNamePlaceholder: 'Jessie Smith',
  participantEmailPlaceholder: 'jessie.smith@example.com',
  newParticipantLabel: 'New participant',
  submitButton: { name: 'Submit' },
  leaveCommentPlaceholder: 'Leave a comment on this poll',
  yourNamePlaceholder: 'Your name…',
  newParticipantNoOption: { label: 'New participant', text: 'No' },
  noText: 'No',
  yesText: 'Yes',
  addCommentButton: { name: 'Add Comment' },
  commentsHeading: { name: 'Comments' },

  // Manage Participants
  participantMenuTestId: 'participant-menu',
  editVotesOption: 'Edit votes',
  voteSelectorTestId: 'vote-selector',
  saveButton: { name: 'Save' },
  voteCount: '1',
  changeNameOption: 'Change name',
  nameInputText: 'Name',
  deleteOption: { name: 'Delete' },
  deleteConfirmationLabel: /^Delete .+\?$/,
  confirmDeleteButton: { name: 'Delete' },
  noParticipantsText: 'No participants',

  // Manage Event poll
  manageButton: { name: 'Manage' },
  pauseMenuItem: { name: 'Pause' },
  pausedText: 'Paused',
  closePollButton: /^[a-zA-Z]*ManageShare$/,
  pausedRadioFilter: { name: 'Paused' },
};
