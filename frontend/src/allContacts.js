export const getContact = (contactId) => {
  contactId = contactId.replace(':', '');
  const allContacts = [
    {
      id: '1',
      first: 'John',
    },
    {
      id: '2',
      first: 'Kia',
    },
    {
      id: '3',
      first: 'Rob',
    },
    {
      id: '4',
      first: 'Sen',
    },
    {
      id: '5',
      first: 'Saken',
    },
    {
      id: '6',
      first: 'Julia',
    },
    {
      id: '7',
      first: 'Martha',
    },
    {
      id: '8',
      first: 'Luna',
    },
  ];

  // Find the contact with the specified contactId
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact || null;
};

export const getContacts = () => {
  return [
    {
      id: '1',
      first: 'John',
    },
    {
      id: '2',
      first: 'Kia',
    },
    {
      id: '3',
      first: 'Rob',
    },
    {
      id: '4',
      first: 'Sen',
    },
    {
      id: '5',
      first: 'Saken',
    },
    {
      id: '6',
      first: 'Julia',
    },
    {
      id: '7',
      first: 'Martha',
    },
  ];
};