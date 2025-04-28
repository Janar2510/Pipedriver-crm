import React, { useState } from 'react';
import { ContactList } from '../components/contacts/ContactList';
import { ContactDetail } from '../components/contacts/ContactDetail';

export const Contacts: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  
  return (
    <div className="h-full flex flex-col">
      {selectedContactId ? (
        <ContactDetail 
          contactId={selectedContactId}
          onBack={() => setSelectedContactId(null)}
        />
      ) : (
        <ContactList onSelectContact={setSelectedContactId} />
      )}
    </div>
  );
};