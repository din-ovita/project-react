import React from "react";
import logo from "../image/pngegg (6).png";
import "../style/footer.css";

function Footer() {
  return (
    <div className="footer">
      <footer>
        <div className="box-footer flex-wrap">
          <div className="box box1">
            <img src={logo} className="logo" />
            <p>
              Kunjungi LeKafe dan temukan berbagai menu hits populer. Tempat
              yang instagramable, cocok untuk berswafoto.
            </p>
            <div className="social">
              <a href="https://www.instagram.com/">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com/">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://www.youtube.com/">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="box box2">
            <h3>Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="copyright">
          <p><i class="fas fa-copyright"></i> Copyright 2022</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
