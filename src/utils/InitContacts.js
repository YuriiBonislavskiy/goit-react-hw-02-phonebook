export const initContacts = contacts => {

  return contacts.sort((firstContact, secondContact) =>
    firstContact.name.localeCompare(secondContact.name)
  );

};