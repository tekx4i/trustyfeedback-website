import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { format } from "date-fns";
import popup from "../../../../assets/empty-cart.png";
import "../UserDashboardLayout.scss";
import { useDispatch, useSelector } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import { removeItem } from "../../../../context/slice/cartSlice";
import { useNavigate } from "react-router-dom";

const CartItem = ({ cart, setCart }) => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [packages, setPackages] = useState(JSON.parse(localStorage.getItem("cartItems")) || items);
  console.log(items);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (token && storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);
  function handleDelete(e, id) {
    e.stopPropagation();
    dispatch(removeItem(id));
    localStorage.removeItem("cartItems");
  }
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (items.length === 0 && storedItems.length > 0) {
      setPackages(storedItems);
    } else {
      setPackages(items);
      localStorage.setItem("cartItems", JSON.stringify(items));
    }
  }, [items]);
  console.log(userInfo);
  return (
    <div className={`custom_dropdown`}>
      {cart && <div className="backdrop" onClick={() => setCart(false)}></div>}
      <div className={`dropdown_ctm_logout notifications ${cart ? "visible_content" : "hidden_content"}`}>
        <div className="notification_dropdown ps-3">
          <h4 className="mb-1">Cart Item</h4>
        </div>

        <div style={{ cursor: "pointer" }} onClick={() => navigate(userInfo?.role_id === 2 ? "/pricing" : "/business/pricing")} className="notification_popup">
          {packages.length > 0 ? (
            packages?.map((i) => (
              <div style={{ alignItems: "center" }} className="notifi-text mb-3 " key={i.id}>
                <div className="text-start">
                  <h6 style={{ color: "black", fontSize: 18, fontWeight: "500" }} className="text-start">
                    {i.name} Package
                  </h6>
                  <h6 style={{ color: "black" }}>$ {i.price}</h6>
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleDelete(e, i.id)} // Pass event to stop propagation
                >
                  <TiDeleteOutline size={22} color="red" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <img src={popup} width={150} height={80} alt="" />
              <h5 className="mt-2">Your cart is empty</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
