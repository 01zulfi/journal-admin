import React, { FC, useState } from 'react';
import onTextInputChange from '../../utils/on-text-input-change';

interface LoginProps {
  onLogin: any;
}

const Login: FC<LoginProps> = function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'https://journal-rest-api.herokuapp.com/login',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        },
      );
      const data = await response.json();
      if (response.status === 200) {
        setErrorMessage('');
        localStorage.setItem('token', data.token);
        onLogin();
        return;
      }
      setErrorMessage(data.message);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onTextInputChange(setUsername)}
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onTextInputChange(setPassword)}
            required
          />
        </label>
        <div>{errorMessage !== '' && errorMessage}</div>
        <button type="submit" onClick={onFormSubmit}>
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
