import React, { useState } from 'react';
import './AddProduct.css';
import images from '../../assets';

const AddProduct = () => {
    const [img, setImg] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        newPrice: '',
        oldPrice: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const imgHandler = (e) => {
        setImg(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]: e.target.value});
    }

    const addProduct = async (e) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('product', img);

        const product = productDetails;

        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).catch((e) => console.log('Error', e));

        const data = await response.json();

        if (response.status == 200) {
            product.image = data.imageUrl;
            const postProductResponse = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
            });
            postProductResponse.status == 201 ? alert('Product Added') : alert('Adding Product Failed');
            setProductDetails({
                name: '',
                image: '',
                category: 'women',
                newPrice: '',
                oldPrice: '',
                description: ''
            });
            setImg(false);
        } else {
            console.log('error product', response.status, product);
        }
        setLoading(false);
    }

    if (loading) {
        return <h1>Uploading...</h1>
    }

  return (
    <div className="add-product">
        <div className="item-fields">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' required />
        </div>
        <div className="item-price">
            <div className="item-fields">
                <p>Price</p>
                <input value={productDetails.oldPrice} onChange={changeHandler} type="text" name="oldPrice" placeholder='Type here' required />
            </div>
            <div className="item-fields">
                <p>Offer Price</p>
                <input value={productDetails.newPrice} onChange={changeHandler} type="text" name="newPrice" placeholder='Type here' required />
            </div>
        </div>
        <div className="item-fields">
            <p>Product Description</p>
            <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type here' required />
        </div>
        <div className="item-fields">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='selector' required>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
            </select>
        </div>
        <div className="item-fields">
            <label htmlFor="file-input">
                <img src={img ? URL.createObjectURL(img) : images.uploadArea} className='thumbnail-img' alt="" />
            </label>
            <input onChange={imgHandler} type="file" name='image' id='file-input' hidden required />
        </div>
        <button onClick={() => addProduct()} className="add-btn">ADD</button>
    </div>
  )
}

export default AddProduct;