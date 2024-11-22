import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { Breadcrum, ProductDisplay } from '../components';

const Product = () => {
    const { allData } = useContext(ShopContext);
    const productId = useParams();
    const product = allData.find(p => p.id === Number(productId));

  return (
    <div>
        <Breadcrum product={product} />
        <ProductDisplay />
    </div>
  )
}

export default Product;