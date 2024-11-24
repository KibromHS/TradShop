import React from 'react';
import './RelatedProducts.css';
import dataProduct from '../../Assets/Frontend_Assets/data';
import Item from '../Item/Item';

const RelatedProducts = () => {
  return (
    <div className="related-products">
        <h1>Related Products</h1>
        <hr />
        <div className="items">
            {dataProduct.map((item, index) => (
                <Item key={index} id={item.id} name={item.name} image={item.image} oldPrice={item.old_price} newPrice={item.new_price} />
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts;