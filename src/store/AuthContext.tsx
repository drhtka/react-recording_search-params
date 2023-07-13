import React, { useState } from 'react';

export const AuthContext = React.createContext({
  authorized: false,
  login: (username: string, password: string) => Promise.resolve(),
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(true);

  async function login(username: string, password: string) {
    if (username !== 'Misha' || password !== '1234') {
      throw new Error('Username or password is wrong.')
    }

    setAuthorized(true);
  }

  return (
    <AuthContext.Provider value={{ authorized, login }}>
      {children}
    </AuthContext.Provider>
  );
};
