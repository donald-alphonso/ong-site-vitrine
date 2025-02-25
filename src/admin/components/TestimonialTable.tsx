import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Edit, Trash2, Plus } from 'lucide-react';
import TestimonialModal from './TestimonialModal';

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  content: string;
  image?: string;
  rating: number;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialTable: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
      try {
        await api.delete(`/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleModalSubmit = async () => {
    await fetchTestimonials();
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
          Nouveau Témoignage
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contenu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Note
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
            {testimonials.map((testimonial) => (
              <tr key={testimonial._id}>
                <td className="px-6 py-4 whitespace-nowrap">{testimonial.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{testimonial.role || '-'}</td>
                <td className="px-6 py-4">
                  {testimonial.content.length > 100
                    ? `${testimonial.content.substring(0, 100)}...`
                    : testimonial.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {'⭐'.repeat(testimonial.rating)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      testimonial.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {testimonial.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial._id)}
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
        <TestimonialModal
          testimonial={editingTestimonial}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default TestimonialTable;
