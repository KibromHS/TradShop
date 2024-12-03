import React, {useState, useEffect} from 'react';
import './ListProduct.css';
import images from '../../assets';

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      console.error('Here Error', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    const response = await fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setProducts(products.filter(p => p.id !== id));
    }
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="list-product">
        <h1>All Products List</h1>
        <div className="format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>

        <div className="all-products">
          <hr />
          {products.map((product, index) => (
            <>
              <div key={index} className="format-main format">
                <img src={product.image} alt="" className='product-icon' />
                <p>{product.name}</p>
                <p>ብር {product.oldPrice}</p>
                <p>ብር {product.newPrice}</p>
                <p>{product.category}</p>
                <img src={images.cross} alt="" className='remove-icon' onClick={() => removeProduct(product.id)} />
              </div>
              <hr />
            </>
          ))}
        </div>
    </div>
  )
}

export default ListProduct;