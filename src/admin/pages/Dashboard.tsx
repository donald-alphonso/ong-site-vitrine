import { useEffect, useState } from 'react';
import ContactTable from '../components/ContactTable';
import api from '../../utils/api';
import { DashboardStats } from '../components/DashboardStats';

interface Stats {
  totalContacts: number;
  pendingContacts: number;
  contactedCount: number;
  resolvedCount: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('xxxxxxxxxxxxx');
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>
      {stats && <DashboardStats stats={stats} />}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Demandes de Contact
        </h2>
        <ContactTable />
      </div>
    </div>
  );
};

export default Dashboard;
