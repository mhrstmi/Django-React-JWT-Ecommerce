import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {login} from '../actions/userActions'
import FormContainer from './../components/FormContainer';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const redirect =location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() =>{
        if (userInfo){
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


  return (
    
      <FormContainer>
        <h1>Sign in</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <loader/>}
        <Form onSubmit={submitHandler} className="d-flex flex-column">
            <Form.Group contrlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
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
                    type="password"
                    placeholder='enter your password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}

                >

                </Form.Control>
            </Form.Group>

            <Button type="submit"  variant="primary">Sgin in</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                dont have an account? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  
    
  )
}

export default LoginScreen