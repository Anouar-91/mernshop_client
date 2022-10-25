import React, {useEffect, useState} from 'react'
import products from '../products';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true)

    const fetchProducts = async() => {
        const {data} = await axios.get('http://localhost:3000/api/products');
        setProducts(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts()
    },[])

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? 'chargement...' : 
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