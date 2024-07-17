import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { assets } from "../../assets/assets";

const Cart = ({ id, name, price, description, image }) => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img
                    className="food-img"
                    src={url + "/images/" + item.image}
                    alt=""
                  />
                  <p>{item.name}</p>
                  <p>&#x20B9;{item.price}</p>
                  {/* <p className="item-quantity">{cartItems[item._id]}</p>  */}

                  {/* the change start from */}

                  <div className="add-more">
                    <img
                      onClick={() => removeFromCart(item._id)}
                      src={assets.remove_icon_red}
                      alt=""
                    />
                    <p>{cartItems[item._id]}</p>
                    <img
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_green}
                      alt=""
                    />
                  </div>
                  {/* the change end here */}

                  <p>&#x20B9;{item.price * cartItems[item._id]}</p>
                  <img
                    onClick={() => removeFromCart(item._id)}
                    className="cross-img"
                    src={assets.cross_icon}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="policy">
        <h3 className="policy-title">
          Review your order and address details to avoid cancellations
        </h3>
        <p className="policy-note">
          {" "}
          <span>Note: </span>If you cancel within 60 seconds of placing your
          order, a 100% refund will be issued. No refund for cancellations made
          after 60 seconds.
        </p>
        <p className="policy-desc">
          Avoid cancellation as it leads to food wastage.
        </p>
        <p className="policy-readmore">Read cancellation policy</p>
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Bill Details</h2>
          <div>
            <div className="cart-total-details">
              <p>Item Total</p>
              <p>&#x20B9;{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#x20B9;{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Tip</p>
              <p className="tip">Add tip</p>
            </div>
            <div className="cart-total-details">
              <p>Platform fee</p>
              <p>
                {" "}
                <span className="platfrom-fee">&#x20B9;5.00</span> &nbsp; 4
              </p>
            </div>
            <div className="cart-total-details">
              <p>GST and Restaurant Charges</p>
              <p>&#x20B9;{getTotalCartAmount() === 0 ? 0 : 84.07} </p>
              {/* <p>&#x20B9;84.07</p> */}
            </div>
            <hr />
            <div className="cart-total-details">
              <b>TO PAY</b>

              <b>
                &#x20B9;
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 84 + 4 + 40}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <p>If your have Coupon, Apply it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Enter coupon code" />
            <button>APPLY</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
