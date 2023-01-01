import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { getOrderDetails, payOrder } from '../redux/actions/orderActions';
import Loader from '../components/Loader';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../redux/constants/orderConstants';
const OrderScreen = () => {
  let { id } = useParams();
  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails
  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay
  const [sdkReady, setSdkReady] = useState(false);
  if (!loading) {
    //calculate prices 
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty, 0
    ))
  }

  const dispatch = useDispatch();
  const addPaypalScript = async () => {
    const { data: clientId } = await axios.get(process.env.REACT_APP_API_URL + "config/paypal")
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }
  useEffect(() => {

    addPaypalScript();
    if (!order || order._id !== id || successPay) {
      dispatch({type:ORDER_PAY_RESET})
      dispatch(getOrderDetails(id))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [order, id, successPay])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(order._id, paymentResult))
  }

  return loading ? <Loader />

    : error ? <Message variant='danger'>{error}</Message>
      : <>
        <h1>Order {order._id}</h1>
        <div className="row mt-5">

          <div className="col-md-8">
            <ul className="list-group">
              <li className="list-group-item">
                <h3>Shipping</h3>
                <p>
                  <strong>Name: </strong> {order.user.name}

                </p>
                <p>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>

                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (<Message variant="success">Delivered on {order.isDelivered}</Message>)
                  : (<Message variant="danger">Not delivered</Message>)}
              </li>
              <li className="list-group-item">
                <h3>Payment Method</h3>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (<Message variant="success">Paid on {order.paidAt}</Message>)
                  : (<Message variant="danger">Not paid</Message>)}

              </li>
              <li className="list-group-item">
                <h3>Order items</h3>
                {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                  <ul className="list-group">
                    {order.orderItems.map((item, index) => (
                      <li key={index} className="list-group-item">
                        <div className="row">
                          <div className="col md-1">
                            <img src={item.image} alt={item.name} className="img-fluid rounded w-50" />
                          </div>
                          <div className="col">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div className="col-md-4">
                            {item.qty} X ${item.price} = ${item.qty * item.price}
                          </div>
                        </div>
                      </li>
                    ))}

                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card">
              <ul className="list-group">
                <li className="list-group-item">
                  <h3>Order Summary</h3>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      Items
                    </div>
                    <div className="col">${order.itemsPrice}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      Shipping
                    </div>
                    <div className="col">${order.shippingPrice}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      Tax
                    </div>
                    <div className="col">${order.taxPrice}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">
                      Total
                    </div>
                    <div className="col">${order.totalPrice}</div>
                  </div>
                </li>
                {!order.isPaid && (
                  <li className="list-group-item">
                    {loadingPay && <Loader />}
                    {!sdkReady ? <Loader/> : (
                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                    )}
                  </li>
                )}

              </ul>
            </div>
          </div>
        </div>
      </>
}

export default OrderScreen