import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { remoteImg } from '../App';
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
      }
    };
    fetchUser();
  }, []);

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
        </nav>
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>
            <form className="form form-user-data">
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
            <form className="form form-user-password">
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
