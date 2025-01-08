import React from 'react';
import ProductItem from '../ProductItem';
import { useSelector, useDispatch } from 'react-redux';

function ProductList() {
  // Access state from Redux
  const products = useSelector((state) => state.product.products || []);  // Fallback to empy array

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {products.map((product) => (
            <ProductItem
              key={product._id} 
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity} {...product}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
     
    </div>
  );
}

export default ProductList;
