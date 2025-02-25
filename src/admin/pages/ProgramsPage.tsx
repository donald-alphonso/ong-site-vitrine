import ProgramTable from '../components/ProgramTable';


const ProgramsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des Programmes</h1>
      <ProgramTable />
    </div>
  );
};

export default ProgramsPage;
