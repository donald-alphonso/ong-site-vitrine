import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    userId: string;
    role: string;
  } | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

interface JWTPayload {
  userId: string;
  role: string;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ userId: string; role: string; } | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Nouvel état pour gérer le chargement

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode<JWTPayload>(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp > currentTime) {
            setIsAuthenticated(true);
            setUser({
              userId: decoded.userId,
              role: decoded.role
            });
          } else {
            // Token expiré
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error('Token invalide:', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setIsLoading(false); // Marquer le chargement comme terminé
    };

    initializeAuth();
  }, []);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<JWTPayload>(token);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUser({
        userId: decoded.userId,
        role: decoded.role
      });
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Ne pas rendre les enfants tant que la vérification initiale n'est pas terminée
  if (isLoading) {
    return <div>Chargement...</div>; // Ou votre composant de chargement personnalisé
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('context',context);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
