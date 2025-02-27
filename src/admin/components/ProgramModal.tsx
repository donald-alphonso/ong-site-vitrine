import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { X, Plus, Minus } from 'lucide-react';

interface Program {
  _id: string;
  title: string;
  description: string;
  image?: string;
  objectives: string[];
  benefits: string[];
  isActive: boolean;
  order: number;
}

interface ProgramModalProps {
  program: Program | null;
  onClose: () => void;
  onSubmit: () => void;
}

const ProgramModal: React.FC<ProgramModalProps> = ({
  program,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    objectives: [''],
    benefits: [''],
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    if (program) {
      setFormData({
        title: program.title,
        description: program.description,
        image: program.image || '',
        objectives: program.objectives.length ? program.objectives : [''],
        benefits: program.benefits.length ? program.benefits : [''],
        order: program.order,
        isActive: program.isActive,
      });
    }
  }, [program]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: 'objectives' | 'benefits'
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: 'objectives' | 'benefits') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (index: number, field: 'objectives' | 'benefits') => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        objectives: formData.objectives.filter(Boolean),
        benefits: formData.benefits.filter(Boolean),
      };

      if (program) {
        await api.put(`/programs/${program._id}`, dataToSend);
      } else {
        await api.post('/programs', dataToSend);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {program ? 'Modifier le Programme' : 'Nouveau Programme'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titre
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Image URL (optionnel)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objectifs
            </label>
            {formData.objectives.map((objective, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={objective}
                  onChange={(e) =>
                    handleArrayChange(index, e.target.value, 'objectives')
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Objectif"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'objectives')}
                  className="text-red-600 hover:text-red-800"
                >
                  <Minus size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('objectives')}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Plus size={16} /> Ajouter un objectif
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bénéfices
            </label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) =>
                    handleArrayChange(index, e.target.value, 'benefits')
                  }
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Bénéfice"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'benefits')}
                  className="text-red-600 hover:text-red-800"
                >
                  <Minus size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('benefits')}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Plus size={16} /> Ajouter un bénéfice
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ordre
            </label>
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
            <label className="ml-2 block text-sm text-gray-900">Actif</label>
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
              {program ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramModal;
