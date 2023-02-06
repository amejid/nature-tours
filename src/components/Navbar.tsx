import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { remoteImg } from '../App';
import { UserContext } from '../context/UserContext';
import logoImg from '../img/logo-white.png';

const Navbar = () => {
  const { currentUser, logout } = useContext(UserContext);
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <NavLink to="/" className="nav__el">
          All Tours
        </NavLink>
      </nav>
      <div className="header__logo">
        <img src={logoImg} alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {currentUser ? (
          <>
            <button
              type="button"
              className="nav__el nav__el--logout"
              onClick={logout}
            >
              Logout
            </button>
            <NavLink to="/" className="nav__el">
              <img
                src={`${remoteImg}/users/${currentUser.photo}`}
                alt={currentUser.name}
                className="nav__user-img"
              />
              <span>{currentUser.name.split(' ')[0]}</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav__el">
              Login
            </NavLink>
            <NavLink to="/register" className="nav__el nav__el--cta">
              Sign up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
