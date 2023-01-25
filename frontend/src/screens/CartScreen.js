import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const location = useLocation();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty]);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    };
    
  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message variant="info">
                    Your cart is empty <Link to="/">Go Back</Link>
                </Message>
            ) : (
                <ListGroup variant="flush">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3} className='d-flex align-items-center '>
                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2} className='d-flex align-items-center '>
                                    ${item.price}
                                </Col>

                                <Col className='d-flex align-items-center justify-content-between'>
                                    quantity: 
                                    <Form.Control 
                                        className='text-center'
                                        as="select"
                                        value={item.qty}
                                        onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}
                                        style={{width: "50%"}}
                                    > 
                                        {
                                        [...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))
                                        }
                                    </Form.Control>

                                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>

                                
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc,item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup.Item>
                    <Button type="button" className='w-100' 
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        PROCEED TO CHECKOUT
                    </Button>
                </ListGroup.Item>
            </Card>                    
        </Col>
    </Row>
  )
}

export default CartScreen