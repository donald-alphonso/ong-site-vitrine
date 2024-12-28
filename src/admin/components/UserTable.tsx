import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/admin/users',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: "delete" | "promote" | "demote") => {
    try {
      const token = localStorage.getItem('token');
      const url = `http://localhost:5000/api/admin/users/${id}/${action === "delete" ? "" : action}`;
      const method = action === "delete" ? "delete" : "patch";
      const response =await axios[method](url, {
        headers: { Authorization: `Bearer ${token}` , "Content-Type": "application/json" },
      });
      alert(`User ${action}d successfully`);
      fetchUsers();
    } catch (error) {
      console.error(`Error trying to ${action} user:`, error)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                ....
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex justify-start gap-2">
                <button className='text-green-600 hover:text-green-900' onClick={() => handleAction(user._id, "promote")}>
                  Promote
                </button>
                <button className='text-orange-600 hover:text-orange-900' onClick={() => handleAction(user._id, "demote")}>
                  Demote
                </button>
                <button className='text-red-600 hover:text-red-900' onClick={() => handleAction(user._id, "delete")}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
