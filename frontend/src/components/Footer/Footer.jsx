import { assets } from "../../assets/assets";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img className="logo4" src={assets.logo4} alt="" />
            <p>Navaura Restaurant and Cafe is a vibrant culinary destination, blending diverse flavors for a delightful dining experience in an inviting ambiance.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-9813682478</li>
                <li>contact@navaura.com</li>
            </ul>
        </div>
        
      </div>
      <hr />
      <p className="footer-copyright"> By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2018-2024 © Navaura™ Ltd. All rights reserved.</p>
    </div>
  );
};

export default Footer;
