import React, { useState, useEffect } from 'react';
import './Popular.css';
// import dataProduct from '../../Assets/Frontend_Assets/data';
import Item from '../Item/Item';

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const response = await fetch('http://localhost:5000/popular-women');
      const data = await response.json();
      setPopular(data);
    }

    fetchPopular();
  }, []);

  return (
    <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popular.map((item, index) => (
                <Item key={index} id={item.id} name={item.name} image={item.image} oldPrice={item.oldPrice} newPrice={item.newPrice} />
            ))}
        </div>
    </div>
  )
}

export default Popular;