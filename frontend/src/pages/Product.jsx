import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { Breadcrum, DescriptionBox, ProductDisplay, RelatedProducts } from '../components';

const Product = () => {
    const { allData } = useContext(ShopContext);
    const { productId }= useParams();
    const product = allData.find(p => p.id == Number(productId));

  return (
    <div>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        <DescriptionBox />
        <RelatedProducts category={product.category} />
    </div>
  )
}

export default Product;