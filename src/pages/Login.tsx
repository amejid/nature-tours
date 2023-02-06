import axios from 'axios';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 1000);
    }
    if (showError) {
      setTimeout(() => setShowError(false), 5000);
    }
  }, [showSuccess, showError, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/users/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const user = data.data.user;
      login(user);
      setShowSuccess(true);
    } catch (err: any) {
      setError(err.response.data.message);
      setShowError(true);
    }
  };

  return (
    <>
      {showSuccess && <Alert type="success" text="Logged in successfully" />}
      {showError && <Alert type="error" text={error} />}
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form__input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form__input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green">Login</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
