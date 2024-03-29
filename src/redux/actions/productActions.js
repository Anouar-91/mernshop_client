import {
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_DETAIL_SUCCESS, 
    PRODUCT_DETAIL_REQUEST, 
    PRODUCT_DETAIL_FAIL, 
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL

} 
from '../constants/productConstants';
import axios from 'axios';

export const listProducts = (keyword = "", pageNumber = "") => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST,})
        const {data} = await axios.get(process.env.REACT_APP_API_URL + 'products?keyword='+keyword+"&pageNumber="+pageNumber)
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

export const deleteProduct = (id) => async (dispatch,getState) => {
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST})
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                Authorization: 'Bearer ' +userInfo.token
            }
        }
        const {data} = await axios.delete(process.env.REACT_APP_API_URL + 'products/' + id, config)
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        })

    }
}

export const createProduct = () => async (dispatch,getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REQUEST})
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +userInfo.token
            }
        }
        const {data} = await axios.post(process.env.REACT_APP_API_URL + 'products/',{}, config)
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        })

    }
}
export const updateProduct = (product) => async (dispatch,getState) => {
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST})
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +userInfo.token
            }
        }
        const {data} = await axios.put(process.env.REACT_APP_API_URL + 'products/'+product._id,{product}, config)
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        })

    }
}

export const createProductReview = (productId, review) => async (dispatch,getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +userInfo.token
            }
        }
        const {data} = await axios.post(process.env.REACT_APP_API_URL + 'products/'+productId+"/reviews",review, config)
        dispatch({
            type:PRODUCT_CREATE_REVIEW_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        })

    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_TOP_REQUEST,})
        const {data} = await axios.get(process.env.REACT_APP_API_URL + 'products/top')
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        })

    }
}

