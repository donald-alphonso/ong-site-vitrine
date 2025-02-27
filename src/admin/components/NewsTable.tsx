import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Edit, Trash2, Plus } from 'lucide-react';
import NewsModal from './NewsModal';

interface News {
  _id: string;
  title: string;
  content: string;
  summary: string;
  image?: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsTable: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')
    ) {
      try {
        await api.delete(`/news/${id}`);
        fetchNews();
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  const handleModalSubmit = async () => {
    await fetchNews();
    handleModalClose();
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Nouvelle Actualité
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Résumé
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Auteur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de publication
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((newsItem) => (
              <tr key={newsItem._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {newsItem.title}
                </td>
                <td className="px-6 py-4">
                  {newsItem.summary.length > 100
                    ? `${newsItem.summary.substring(0, 100)}...`
                    : newsItem.summary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {newsItem.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(newsItem.publishDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      newsItem.isPublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {newsItem.isPublished ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(newsItem)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(newsItem._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <NewsModal
          news={editingNews}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default NewsTable;
