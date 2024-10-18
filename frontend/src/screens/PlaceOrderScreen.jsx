import { useState,useEffect} from 'react'
import {Row,Button,Col,Card,ListGroup,Image} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
const PlaceOrderScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const navigate = useNavigate();


    const cart = useSelector((state)=> state.cart);
    const {shippingAddress} = cart;

    useEffect(()=>{
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        }else if(!cart.paymentMethod){
            navigate('/payment')
        }
    },[cart.shippingAddress.address,cart.paymentMethod,navigate])


  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>Column</Col>
            <Col md={4}>Column</Col>

        </Row>

    </>
  )
}

export default PlaceOrderScreen
