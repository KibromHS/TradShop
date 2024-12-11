import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { Breadcrum, DescriptionBox, ProductDisplay, RelatedProducts } from '../components';

const Product = () => {
    const { allData } = useContext(ShopContext);
    const { productId }= useParams();
    const product = allData.find(p => p.id == Number(productId));

    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoadingReviews(true);
            const response = await fetch(`http://localhost:5000/reviews/${product.id}`);
            const data = await response.json();
            setReviews(data);
            setLoadingReviews(false);
        }
        fetchReviews();
    }, []);

  return (
    <div>
        <Breadcrum product={product} />
        <ProductDisplay product={product} reviews={reviews} />
        <DescriptionBox reviews={reviews} loading={loadingReviews} />
        <RelatedProducts category={product.category} />
    </div>
  )
}

export default Product;