import MissionTable from '../components/MissionTable';

const MissionsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des Missions</h1>
      <MissionTable />
    </div>
  );
};

export default MissionsPage;
