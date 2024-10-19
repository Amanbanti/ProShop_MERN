import { useState,useEffect} from 'react'
import {Row,Button,Col,Card,ListGroup,Image, ListGroupItem} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { useSelector,useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import Message from '../components/Message';
const PlaceOrderScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const cart = useSelector((state)=> state.cart);
    const {shippingAddress} = cart;

    const [createOrder ,{isLoading ,error}]= useCreateOrderMutation();

    useEffect(()=>{
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        }else if(!cart.paymentMethod){
            navigate('/payment')
        }
    },[cart.shippingAddress.address,cart.paymentMethod,navigate]);


    const placeOrderHandler = async ()=>{
        try{
            const res = await createOrder({
                orderItems : cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod :cart.paymentMethod,
                itemsPrice : cart.itemsPrice,
                shippingPrice:cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice:cart.totalPrice,
            }).unwrap();

        dispatch(clearCartItems());
        navigate(`/order/$(res._id)`);
        }catch(error){
            toast.error(error);
        }
       
    }


  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address},{cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method:</strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems === 0 ?(
                                <Message>Your cart is empty!</Message>
                        ):(
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item,index)=>(
                                    <ListGroup.Item key={index}> 
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name}
                                                fluid rounded
                                                />
                                            </Col>

                                            <Col>
                                                <Link to={`/products/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>

                                            <Col>
                                            {item.qty} x ${item.price} = ${item.qty*item.price }
                                            </Col>

                                            

                                        </Row>
                                    </ListGroup.Item>
                                ))}

                            </ListGroup>
                        )}

                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${cart.itemsPrice}</Col>
                               
                            </Row>
                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice}</Col>
                               
                            </Row>
                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                               
                            </Row>
                            
                        </ListGroup.Item>

                        
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${cart.totalPrice}</Col>
                               
                            </Row>
                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error.data?.message || error.message || 'An error occurred'}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type='butten'
                                className='btn-block'
                                disabled={cart.cartItems.length === 0}
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </Button>

                            {isLoading && <Loader/>}
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row>

    </>
  )
}

export default PlaceOrderScreen
