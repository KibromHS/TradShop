import React from 'react';
import { Hero, NewCollections, NewsLetter, Offers, Popular } from '../components';

const Shop = () => {
  return (
    <div>
        <Hero />
        <Popular />
        <Offers />
        <NewCollections />
        <NewsLetter />
    </div>
  )
}

export default Shop;