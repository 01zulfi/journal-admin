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
    <section className="m-4 sm:ml-16">
      <h2 className="text-3xl underline font-bold text-purple-500">Login</h2>
      <form className="my-6 pb-4 sm:w-3/5 shadow-md bg-purple-50 flex flex-col rounded p-2 gap-2">
        <label htmlFor="username" className="label-input">
          Username:
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onTextInputChange(setUsername)}
            required
          />
        </label>
        <label htmlFor="password" className="label-input">
          Password:
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onTextInputChange(setPassword)}
            required
          />
        </label>
        <div className="text-purple-500">
          {errorMessage !== '' && errorMessage}
        </div>
        <button className="button w-fit" type="submit" onClick={onFormSubmit}>
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
