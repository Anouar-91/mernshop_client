import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import {ThreeDots} from  'react-loader-spinner'
//redux
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';


const HomeScreen = () => {
    let {keyword} = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])



    return (
        <div className="container">
            <h1>Latest Products</h1>
            {loading 
            ? <ThreeDots wrapperStyle={{justifyContent: 'center'}} /> 
            : error 
            ? (<Message variant="danger">{error}</Message>) :
                <div className="row">
                    {products.map(product => {
                        return (
                            <div key={product._id} className="col-md-4">
                                <Product product={product} />
                            </div>
                        )

                    })}
                </div>

            }

        </div>
    )
}

export default HomeScreen