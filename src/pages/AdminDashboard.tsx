import axios from "axios";
import { useEffect, useState } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/admin/users', {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setUsers(response.data);
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        }
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;