import React from 'react';
import './NewCollections.css';
import newCollection from '../../Assets/Frontend_Assets/new_collections';
import Item from '../Item/Item';

const NewCollections = () => {
  return (
    <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {newCollection.map((item, index) => (
                <Item key={index} id={item.id} name={item.name} image={item.image} oldPrice={item.old_price} newPrice={item.new_price} />
            ))}
        </div>
    </div>
  )
}

export default NewCollections;