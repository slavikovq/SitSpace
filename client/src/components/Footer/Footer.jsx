import "../../scss/Footer.scss";
import logo from "../../assets/img/footer-logo.png";
import circle from "../../assets/icons/gray-circle.png";

export default function Footer() {
  return (
    <>
      <div id="Footer">
        <div className="footer">
          <div>
            <img src={logo} alt="" className="footer-logo" />
          </div>
          <div>
            <h1>Useful links</h1>
            <ul>
              <li>About us</li>
              <li>How to begin</li>
              <li>Reviews</li>
              <li>Sign-up</li>
            </ul>
          </div>
          <div className="footer-contact">
            <h1>Contact us</h1>
            <p>contact@sitspace.com</p>
          </div>
          <div>
            <h1>Social sites</h1>
            <div className="socials">
              <img src={circle} alt="" className="circle" />
              <img src={circle} alt="" className="circle" />
              <img src={circle} alt="" className="circle" />
              <img src={circle} alt="" className="circle" />
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 SitSpace</p>
        </div>
      </div>
    </>
  );
}
