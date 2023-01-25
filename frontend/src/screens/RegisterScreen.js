import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {register} from '../actions/userActions'
import FormContainer from './../components/FormContainer';

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const redirect =location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading} = userRegister

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() =>{
        if (userInfo){
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password))
        }
        
    }
  return (
    <FormContainer>
        <h1>Register</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <loader/>}
        <Form onSubmit={submitHandler} className="d-flex flex-column">
            <Form.Group contrlId="name">
                <Form.Label>Full Name (optional)</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder='enter your full name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}

                >

                </Form.Control>
            </Form.Group>

            <Form.Group contrlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    required
                    type="email"
                    placeholder='enter email address'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}

                >

                </Form.Control>
            </Form.Group>


            <Form.Group contrlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    required
                    type="password"
                    placeholder='enter your password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}

                >

                </Form.Control>
            </Form.Group>

            <Form.Group contrlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    required
                    type="password"
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}

                >

                </Form.Control>
            </Form.Group>
            {message && <Message variant="danger">{message }</Message>}

            <Button type="submit"  variant="primary">REGISTER</Button>
        </Form>


        <Row className='py-3'>
            <Col>
                you already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen