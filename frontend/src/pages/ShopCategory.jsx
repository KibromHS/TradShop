import React, { useContext } from 'react';
import './css/ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import images from '../Assets/Frontend_Assets';
import { Item } from '../components';

const ShopCategory = ({ category, banner }) => {
    const products = useContext(ShopContext);
    
  return (
    <div className="shop-category">
        <img className='banner' src={banner} alt="" />
        <div className="index-sort">
            <p><span>Showing 1-12</span> out of 36 products</p>
            <div className="sort">
                Sort by <img src={images.dropDown} alt="" />
            </div>
        </div>
        
        <div className="products">
            {products.allData.map((item, index) => {
                if (category === item.category) {
                    return <Item key={index} id={item.id} name={item.name} image={item.image} oldPrice={item.oldPrice} newPrice={item.newPrice} />
                } else {
                    return null;
                }
            })}
        </div>

        <div className="load-more">
            Explore More
        </div>
    </div>
  )
}

export default ShopCategory;