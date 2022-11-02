import {
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_DETAIL_SUCCESS, 
    PRODUCT_DETAIL_REQUEST, 
    PRODUCT_DETAIL_FAIL 

} 
from '../constants/productConstants';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST,})
        const {data} = await axios.get(process.env.REACT_APP_API_URL + 'products')
        console.log(data);
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        })

    }
}

export const detailProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAIL_REQUEST})
        const {data} = await axios.get(process.env.REACT_APP_API_URL + 'products/' + id)
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        })

    }
}

