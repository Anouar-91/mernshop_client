import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../redux/actions/productActions';
import { ThreeDots } from 'react-loader-spinner';
import Message from '../components/Message';
import { useNavigate } from "react-router-dom";

const ProductScreen = () => {
    let { id } = useParams();
    const dispatch = useDispatch();
    //const [loading, setLoading] = useState(true);
    const productDetail = useSelector(state => state.productDetail)
    const { product, loading, error } = productDetail;
    const [qty, setQty] = useState(0);
    const navigate = useNavigate();



    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    useEffect(() => {
        dispatch(detailProduct(id))
    }, [id, dispatch])

    return (
        <>
            <Link to={"/"} className="btn btn-light my-3">Retour</Link>
            {loading
                ? <ThreeDots wrapperStyle={{ justifyContent: 'center' }} />
                : error ? <Message variant='danger'>{error}</Message> : (
                    <div className="row ">
                        <div className="col-md-6 mt-3">
                            <img src={product.image} alt="produit" />
                        </div>
                        <div className="col-md-3 mt-3">
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <h4>{product.name}</h4>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <h4>Price : {product.price}$</h4>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Description : {product.description}
                                </li>

                            </ul>
                        </div>
                        <div className="col-md-3 mt-3">
                            <div className="card">
                                <ul className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="row">
                                            <div className="col">
                                                Price:
                                            </div>
                                            <div className="col">
                                                <strong>{product.price}$</strong>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="row">
                                            <div className="col">
                                                Status:
                                            </div>
                                            <div className="col">
                                                <strong>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                                            </div>
                                        </div>
                                    </li>
                                    {product.countInStock > 0 && (
                                        <li className="list-group-item d-flex justify-content-center align-items-center ">
                                            <div className="row">
                                                <div className="col">Qty</div>
                                                <div className="col">
                                                    <select className="form-select" value={qty} onChange={(e) => setQty(e.target.value)} >
                                                        <option selected>Open this select menu</option>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option  key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                    <li className="list-group-item d-flex justify-content-center align-items-center ">
                                        <button onClick={() => addToCartHandler()} disabled={product.countInStock === 0} className="btn btn-primary">Add to cart</button>
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