import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails, updateUser} from '../actions/userActions'
import { USER_UPDATE_USER_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const {success} = userUpdate

    useEffect(() =>{
        if (!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_USER_RESET})
                dispatch(getUserDetails('user'))
            }else{
                setName(user.name)
                setEmail(user.email)
                
            }
        }
    }, [userInfo, navigate, dispatch, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
           dispatch(updateUser({'id':user._id, 'name':name, 'email':email, 'password':password}))
           setMessage('')
        }
        
        
    }
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>

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
                        type="password"
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}

                    >

                    </Form.Control>
                </Form.Group>
                {message && <Message variant="danger">{message }</Message>}

                <Button type="submit"  variant="primary">UPDATE</Button>
            </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen