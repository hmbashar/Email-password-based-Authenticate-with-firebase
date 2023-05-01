import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase/firebase.config';



const auth = getAuth(app);

const Register = () => {

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');

    const handelSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        setSuccess(''); // by default success message was removed.
        
        console.log(email, password);


        //create user in firebase

        createUserWithEmailAndPassword(auth, email, password)
        .then (result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccess('User has created successfully');
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);           
        })

    }

    const handelEmailChange = (event) => {

    }

    const handelPassword = (event) => {

    }

    return (
        <div>
            <h4 className='text-primary mt-5'>Register</h4>            
            <Form onSubmit={handelSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label htmlFor='email'>Email address</Form.Label>
                    <Form.Control type="email" placeholder='Your Email' id='email' name='email' required />                 
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password"  name='password' id='password' placeholder='Your Password' required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
           
        </div>
    );
};

export default Register;