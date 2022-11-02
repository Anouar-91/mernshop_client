import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import {ThreeDots} from  'react-loader-spinner'
//redux
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import Message from '../components/Message';


const HomeScreen = () => {
    //without redux
    /*  const [products, setProducts] = useState();
        const [loading, setLoading] = useState(true)
    
        const fetchProducts = async() => {
            const {data} = await axios.get('http://localhost:3000/api/products');
            setProducts(data);
            setLoading(false);
        }
        useEffect(() => {
            fetchProducts()
        },[]) */

    //with redux
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])



    return (
        <>
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

        </>
    )
}

export default HomeScreen