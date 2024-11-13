import { useState, useEffect } from "react";
import { getProductPrice } from "./product";
import PropTypes from "prop-types";

function OrderDetail({ productId, name, quantity, onSubtotalChange }) {
  const [price, setPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const price = getProductPrice(productId);
    setPrice(price);
    setSubtotal(price * quantity);
    onSubtotalChange(productId, price * quantity);
  }, [productId, quantity, onSubtotalChange]);

  return (
    <div className="flex gap-1">
      <p>Product ID: {productId} |</p>
      <p>Product Name: {name} |</p>
      <p>Quantity: {quantity} |</p>
      <p>Price: Rp. {price} |</p>
      <p>Subtotal: Rp. {subtotal} |</p>
    </div>
  );
}

OrderDetail.propTypes = {
  productId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onSubtotalChange: PropTypes.func.isRequired,
};

export default OrderDetail;
