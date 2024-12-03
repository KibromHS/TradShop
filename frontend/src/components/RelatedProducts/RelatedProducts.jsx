import React from 'react';
import './RelatedProducts.css';
import allProduct from '../../Assets/Frontend_Assets/all_product';
import Item from '../Item/Item';

const RelatedProducts = ({ category }) => {
  return (
    <div className="related-products">
        <h1>Related Products</h1>
        <hr />
        <div className="items">
          {allProduct.filter(product => product.category == category).slice(0, 4).map((item, index) => (
            <Item key={index} id={item.id} name={item.name} image={item.image} oldPrice={item.old_price} newPrice={item.new_price} />
          ))}
        </div>
    </div>
  )
}

export default RelatedProducts;