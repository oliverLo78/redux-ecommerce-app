import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
// Import redux actions
import { addToCart, updateCartQuantity } from "../../redux/slices/cartSlice";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  // Use dispatch from Redux 
  const dispatch = useDispatch();
  // Access cart items from Redux store
  const  cart  = useSelector(state => state.cart.cart);

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;



  const addProductToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    
    if (itemInCart) {
      // Dispatch the action to update the cart quantity
      dispatch(updateCartQuantity({
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      }));

      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(addToCart({ 
        ...item,
        purchaseQuantity: 1 
      }));
        
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addProductToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
