import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../redux/actions/productActions';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            //
        }
    }
    const createProductHandler = (product) => {

    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <div className="">
                    <h1>Products</h1>
                </div>
                <div className="text-right ">
                    <button className="my-3 btn btn-primary" onClick={createProductHandler}>Create product</button>
                </div>
            </div>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <table className="table table-hover">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">CATEGORY</th>
                            <th className="col">BRAND</th>
                            <th className="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td scope="row">{product._id}</td>
                                <td>{product.name}</td>
                                <td> 
                                    ${product.price}
                                </td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Link className="btn btn-sm btn-warning" to={`/admin/product/${product._id}/edit`}><i className="fa-regular fa-pen-to-square"></i></Link>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteHandler(product._id)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default ProductListScreen