import React from 'react';
// Import the useDispatch and useSelector hooks from React-Redux
import { useDispatch } from 'react-redux';
// Import removeFromCart and UpdateCartQuantity from the cartSlice
import { removeFromCart, updateCartQuantity } from "../../redux/slices/cartSlice";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  // Use the useDispatch hook to assign the dispatch function to a variable
  const dispatch = useDispatch();

  // function to handle removing item from cart
  const handleRemoveFromCart = (item) => {}
    dispatch(removeFromCart(item._id));
    // Remove item from IndexedDB
    idbPromise('cart', 'delete', { ...item});
  };
  
  // function to handle updating item quantity in cart
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);

    if (value === '0') {
      handleRemoveFromCart(item);
    } else {
      // Dispatch the updateCartQuantity action with the item's _id and the new quantity
      dispatch(updateCartQuantity({ _id: item._id, purchaseQuantity: value })); 
      // Update the item in IndexedDB
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={handleQuantityChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => handleRemoveFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
