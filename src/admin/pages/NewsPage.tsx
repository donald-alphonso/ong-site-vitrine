import NewsTable from '../components/NewsTable';

const NewsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des Actualités</h1>
      <NewsTable />
    </div>
  );
};

export default NewsPage;
