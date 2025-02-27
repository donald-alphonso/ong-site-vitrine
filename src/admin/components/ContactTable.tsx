import { useState, useEffect } from 'react';
import api from '../../utils/api';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/admin/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fecthing contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (
    id: string,
    action: 'delete' | 'update',
    contact?: Object
  ) => {
    try {
      const url = `/admin/contacts/${id}/${action === 'delete' ? '' : action}`;
      const method = action === 'delete' ? 'delete' : 'patch';
      if (action === 'update' && contact) {
        await api[method](url, contact);
        setEditingContact(null);
      } else if (action === 'delete') {
        await api[method](url);
      }
      alert(`Contact ${action}d successfully`);
      fetchContacts();
    } catch (error: any) {
      console.error(`Error trying to ${action} contact:`, error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {contact.name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div>{contact.email}</div>
                <div className="text-sm text-gray-500">{contact.phone}</div>
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                <div className="max-w-xs truncate">{contact.message}</div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {editingContact?._id === contact._id ? (
                  <select
                    className="form-select"
                    value={editingContact.status}
                    onChange={(e) =>
                      setEditingContact({
                        ...editingContact,
                        status: e.target.value as Contact['status'],
                      })
                    }
                  >
                    <option value="pending">En attente</option>
                    <option value="contacted">Contacté</option>
                    <option value="resolved">Résolu</option>
                  </select>
                ) : (
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                      contact.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : contact.status === 'contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {contact.status === 'pending'
                      ? 'En attente'
                      : contact.status === 'contacted'
                        ? 'Contacté'
                        : 'Résolu'}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {editingContact?._id === contact._id ? (
                  <div className="space-x-2">
                    <button
                      onClick={() =>
                        handleAction(contact._id, 'update', {
                          status: editingContact.status,
                          notes: editingContact.notes,
                        })
                      }
                      className="text-green-600 hover:text-green-900"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingContact(null)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={() => setEditingContact(contact)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleAction(contact._id, 'delete')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
