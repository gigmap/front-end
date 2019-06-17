export const addMemberNames = (concert) => ({
  ...concert,
  memberNames: concert.members.map(it => it.displayName).join(', ')
});