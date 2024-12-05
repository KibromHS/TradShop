import React, { useState } from 'react';
import './NewCollections.css';
// import newCollection from '../../Assets/Frontend_Assets/new_collections';
import Item from '../Item/Item';
import { useEffect } from 'react';

const NewCollections = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/new-collections');
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className="new-collections" id='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {products.map((item, index) => (
                <Item key={index} id={item.id} name={item.name} image={item.image} oldPrice={item.oldPrice} newPrice={item.newPrice} />
            ))}
        </div>
    </div>
  )
}

export default NewCollections;