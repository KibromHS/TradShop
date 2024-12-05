import React, { useContext } from 'react';
import './RelatedProducts.css';
// import allProduct from '../../Assets/Frontend_Assets/all_product';
import Item from '../Item/Item';
import { ShopContext } from '../../context/ShopContext';

const RelatedProducts = ({ category }) => {

  const {allData} = useContext(ShopContext);

  return (
    <div className="related-products">
        <h1>Related Products</h1>
        <hr />
        <div className="items">
          {allData.filter(product => product.category == category).slice(0, 4).map((item, index) => (
            <Item key={index} id={item.id} name={item.name} image={item.image} oldPrice={item.oldPrice} newPrice={item.newPrice} />
          ))}
        </div>
    </div>
  )
}

export default RelatedProducts;