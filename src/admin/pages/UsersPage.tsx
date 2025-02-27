import { useState } from 'react';
import UserTable from '../components/UserTable';
import UserCreateModal from '../components/UserCreateModal';

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Nouvel Utilisateur
        </button>
      </div>

      <UserTable />

      {isModalOpen && (
        <UserCreateModal onUserCreated={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default UsersPage;
