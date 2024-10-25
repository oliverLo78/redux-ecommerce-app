import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategories, updateCurrentCategory } from '../../redux/slices/categorySlice';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  // Use useDispatch hook for dispatching actions
  const usedispatch = useDispatch();
  // Select categories from the Redux store
  const categories  = useSelector(state => state.product.categories);

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      // Dispatch the redux action to update categories
      usedispatch(updateCategories(categoryData.categories));

      // Store catefories in IndexedDB for offline use
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        usedispatch(updateCategories(categories));
      });
    }
  }, [categoryData, loading ]);

  const handleClick = (id) => {
    // Dispatch the Redux action to update current category
    usedispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories && categories.length > 0 ? (
        categories.map((item) => (
          <button
            key={item._id}
            onClick={() => handleClick(item._id)}
          >
            {item.name}
          </button>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );  
}

export default CategoryMenu;
