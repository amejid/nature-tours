import axios from 'axios';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { remoteImg } from '../App';
import { UserContext } from '../context/UserContext';
import iconSvg from '../img/icons.svg';

type User = {
  _id: string;
  email: string;
  name: string;
  photo: string;
  role: string;
};

const Account = () => {
  const [user, setUser] = useState<User>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState<Blob | string>('');
  const [password, setPassword] = useState('');
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/v1/users/me',
          { withCredentials: true }
        );

        setUser(data.data.data);
        setName(data.data.data.name);
        setEmail(data.data.data.email);
      } catch (err: any) {
        console.log(err.response.data.message);
        navigate('/');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleUpdateData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('photo', selectedFile);

      const { data } = await axios.patch(
        'http://localhost:5000/api/v1/users/updateMe',
        formData,
        { withCredentials: true }
      );
      login(data.data.user);
      setUser(data.data.user);
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        'http://localhost:5000/api/v1/users/updateMyPassword',
        { password, passwordCurrent, passwordConfirm },
        { withCredentials: true }
      );
      setPassword('');
      setPasswordConfirm('');
      setPasswordCurrent('');
      login(data.data.user);
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFiles = files as FileList;
    setSelectedFile(selectedFiles?.[0]);
  };

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'side-nav--active' : ''
                }
              >
                <svg>
                  <use xlinkHref={`${iconSvg}#icon-settings`}></use>
                </svg>
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-tours"
                className={({ isActive }) =>
                  isActive ? 'side-nav--active' : ''
                }
              >
                <svg>
                  <use xlinkHref={`${iconSvg}#icon-briefcase`}></use>
                </svg>
                My bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'side-nav--active' : ''
                }
              >
                <svg>
                  <use xlinkHref={`${iconSvg}#icon-star`}></use>
                </svg>
                My reviews
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'side-nav--active' : ''
                }
              >
                <svg>
                  <use xlinkHref={`${iconSvg}#icon-credit-card`}></use>
                </svg>
                Billing
              </NavLink>
            </li>
          </ul>
          {user?.role === 'admin' && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <li>
                  <NavLink to="/">
                    <svg>
                      <use xlinkHref={`${iconSvg}#icon-map`}></use>
                    </svg>
                    Manage tours
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <svg>
                      <use xlinkHref={`${iconSvg}#icon-users`}></use>
                    </svg>
                    Manage users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <svg>
                      <use xlinkHref={`${iconSvg}#icon-star`}></use>
                    </svg>
                    Manage reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <svg>
                      <use xlinkHref={`${iconSvg}#icon-briefcase`}></use>
                    </svg>
                    Manage bookings
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </nav>
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>
            <form className="form form-user-data" onSubmit={handleUpdateData}>
              <div className="form__group">
                <label htmlFor="name" className="form__label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form__input"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form__group ma-bt-md">
                <label htmlFor="email" className="form__label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form__group form__photo-upload">
                {user?.photo && (
                  <img
                    src={`${remoteImg}/users/${user?.photo}`}
                    alt=""
                    className="form__user-photo"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  id="photo"
                  className="form__upload"
                  onChange={selectFile}
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save settings
                </button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form
              className="form form-user-password"
              onSubmit={handleUpdatePassword}
            >
              <div className="form__group">
                <label htmlFor="password-current" className="form__label">
                  Current password
                </label>
                <input
                  type="password"
                  id="password-current"
                  className="form__input"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  onChange={(e) => setPasswordCurrent(e.target.value)}
                />
              </div>
              <div className="form__group">
                <label htmlFor="password" className="form__label">
                  New password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form__input"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form__group ma-bt-lg">
                <label htmlFor="password-confirm" className="form__label">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="password-confirm"
                  className="form__input"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green btn--save-password">
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
