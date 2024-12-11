import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
}

export const getUserRole = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded.role;
}