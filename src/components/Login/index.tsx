import React, { FC, useState } from 'react';
import onTextInputChange from '../../utils/on-text-input-change';

const Login: FC = function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = () => {};

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
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={onTextInputChange(setPassword)}
          />
        </label>
        <button type="submit" onClick={onFormSubmit}>
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
