import './Navbar.css'
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className='navbar'>
         <img className="nav-logo" src={assets.logo} alt="" />
         <img className='nav-profile' src={assets.profile_icon} alt="" />
    </div>
  )
}

export default Navbar