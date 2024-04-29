import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets2/Product_Cart.svg"
import list_product_icon from "../../assets2/Product_list_icon.svg"
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Dishes</p>
        </div>
      </Link>

      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Dishes List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
