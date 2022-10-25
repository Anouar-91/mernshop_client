import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Rating from '../components/Rating';
import products from '../products';
import axios from 'axios';


const ProductScreen = () => {
    let { id } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    //const product = products.find((p) => p._id === id)

    const fetchProduct = async() => {
        const {data} = await axios.get('http://localhost:3000/api/product/' + id);
        setProduct(data)
        console.log(data);
        setLoading(false)
    }

    useEffect(() => {
        fetchProduct();
    },[id])  

    return (
        <>
            <Link to={"/"} className="btn btn-light my-3">Retour</Link>
            {loading ? 'loading...' : (
            <div className="row">
            <div className="col-md-6">
                <img src={product.image} alt="image du produit" />
            </div>
            <div className="col-md-3">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <h4>{product.name}</h4>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <h4>Price : {product.price}$</h4>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Description : {product.description}
                    </li>

                </ul>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div className="row">
                                <div className="col">
                                    Price:
                                </div>
                                <div className="col">
                                    <strong>{product.price}$</strong>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div className="row">
                                <div className="col">
                                    Status:
                                </div>
                                <div className="col">
                                    <strong>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-center align-items-center ">
                            <button disabled={product.countInStock === 0 } className="btn btn-primary">Add to cart</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            )}

        </>
    )
}

export default ProductScreen