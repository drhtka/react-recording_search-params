import { useNavigate, useLocation } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../store/AuthContext';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state?.pathname || '/';

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage('');

    login(username, password)
      .then(() => navigate(path, { replace: true }))
      .catch(error => setErrorMessage(error.message));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="username"
        value={username}
        onChange={event => {
          setUsername(event.target.value);
          setErrorMessage('');
        }}
      />
      <input 
        type="password" 
        placeholder="password"
        value={password}
        onChange={event => {
          setPassword(event.target.value);
          setErrorMessage('');
        }}
      />

      <button>Sign in</button>

      {errorMessage && (
        <p className="message is-danger">{errorMessage}</p>
      )}
    </form>
  );
};