import { useEffect, useState } from 'react';
import ContactTable from '../components/ContactTable';
import api from '../../utils/api';

interface Stats {
  totalContacts: number;
  pendingContacts: number;
  contactedCount: number;
  resolvedCount: number;
}

const ContactsPage: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/contactStats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des Contacts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total des contacts</h3>
          <p className="text-2xl">{stats?.totalContacts || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">En attente</h3>
          <p className="text-2xl">{stats?.pendingContacts || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Contactés</h3>
          <p className="text-2xl">{stats?.contactedCount || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Résolus</h3>
          <p className="text-2xl">{stats?.resolvedCount || 0}</p>
        </div>
      </div>
      <ContactTable />
    </div>
  );
};

export default ContactsPage;
