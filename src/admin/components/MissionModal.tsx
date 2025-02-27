import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { X } from 'lucide-react';
import IconSelector from './IconSelector';

interface Mission {
  _id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  order: number;
}

interface MissionModalProps {
  mission: Mission | null;
  onClose: () => void;
  onSubmit: () => void;
}

const MissionModal: React.FC<MissionModalProps> = ({
  mission,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Target',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    if (mission) {
      setFormData({
        title: mission.title,
        description: mission.description,
        icon: mission.icon,
        isActive: mission.isActive,
        order: mission.order,
      });
    }
  }, [mission]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mission) {
        await api.put(`/missions/${mission._id}`, formData);
      } else {
        await api.post('/missions', formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving mission:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {mission ? 'Modifier la Mission' : 'Nouvelle Mission'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icône</label>
            <IconSelector
              selectedIcon={formData.icon}
              onSelectIcon={(iconName) =>
                setFormData((prev) => ({ ...prev, icon: iconName }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ordre</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Active</label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {mission ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MissionModal;
