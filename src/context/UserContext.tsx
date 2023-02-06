import { createContext, ReactNode, useState } from 'react';

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

type CurrentUser = {
  user: User;
  token: string;
};

export type UserContent = {
  currentUser: CurrentUser | undefined;
  login: (user: CurrentUser) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContent>({
  currentUser: undefined,
  login: (user: CurrentUser) => null,
  logout: () => null,
});

export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  const login = (user: CurrentUser) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(undefined);
  };

  const value = { currentUser, login, logout };

  return <UserContext.Provider value={value} children={children} />;
};
