import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { useContext } from "react";

const Placeorder = () => {
  const {getTotalCartAmount } = useContext(StoreContext);
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone number" />
      </div>
      <div className="place-order-right">
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
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
