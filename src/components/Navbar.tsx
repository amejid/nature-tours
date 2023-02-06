import { remoteImg } from '../App';
import logoImg from '../img/logo-white.png';

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a href="/" className="nav__el">
          All Tours
        </a>
      </nav>
      <div className="header__logo">
        <img src={logoImg} alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        <>
          <a href="/" className="nav__el">
            My bookings
          </a>
          <a href="/" className="nav__el">
            <img
              src={`${remoteImg}/users/user-1.jpg`}
              alt="Jonas"
              className="nav__user-img"
            />
            <span>Amejid</span>
          </a>
        </>
        <button className="nav__el">Log in</button>
        <button className="nav__el nav__el--cta">Sign up</button>
      </nav>
    </header>
  );
};

export default Navbar;
