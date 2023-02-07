import axios from 'axios';
import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children?: ReactNode;
};

type User = {
  _id: string;
  email: string;
  name: string;
  photo: string;
  role: string;
};

export type UserContent = {
  currentUser: User | undefined;
  login: (user: User) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContent>({
  currentUser: undefined,
  login: (user: User) => null,
  logout: () => null,
});

export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:5000/api/v1/users/logout', {
        withCredentials: true,
      });
      setCurrentUser(undefined);
      navigate('/');
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  const value = { currentUser, login, logout };

  return <UserContext.Provider value={value} children={children} />;
};
