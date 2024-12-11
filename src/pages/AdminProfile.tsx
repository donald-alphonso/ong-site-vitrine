import { getUserRole } from "../utils/auth"

const AdminProfile: React.FC = () => {
    const role = getUserRole();

    return (
        <div>
            <h1>Admin Profile</h1>
            <p>Role: {role}</p>
        </div>
    );
}

export default AdminProfile;