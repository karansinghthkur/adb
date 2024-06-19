import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="Book Cover" />
      <div>
        <Link to={`/book/${item.book}`}>{item.name}</Link>
        <span>{`Price: $ ${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.book)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
