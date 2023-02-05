import greenImg from '../img/logo-green.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={greenImg} alt="Full logo"/>
      </div>
      <ul className="footer__nav">
        <li><a href="#">About us</a></li>
        <li><a href="#">Download apps</a></li>
        <li><a href="#">Become a guide</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <p className="footer__copyright">
        &copy; by Amejid. Feel free to use this project for your own purposes.
      </p>
    </footer>
  )
}

export default Footer