import React from 'react';
import './Popular.css';
import dataProduct from '../../Assets/Frontend_Assets/data';
import Item from '../Item/Item';

const Popular = () => {
  return (
    <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {dataProduct.map((item, index) => (
                <Item key={index} id={item.id} name={item.name} image={item.image} oldPrice={item.old_price} newPrice={item.new_price} />
            ))}
        </div>
    </div>
  )
}

export default Popular;