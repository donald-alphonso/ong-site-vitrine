import UserTable from '../components/UserTable';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Users</h2>
        <UserTable />
      </div>
    </div>
  );
};

export default Dashboard;
