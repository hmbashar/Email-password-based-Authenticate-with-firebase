import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail} from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';



const auth = getAuth(app);


const Login = () => {    

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');

    const emailRef = useRef();

    const handelLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            setSuccess('User has been successfully Loggin');
            setError('');
        }) 
        .catch(error => {
            console.log(error);
            setError(error.message);
            setSuccess('');
        })
    }

    const handelResetPassword = event => {
       const forgetEmail = emailRef.current.value;
       if(!forgetEmail) {
            alert('Please provide your email address to reset your password');
       }
       sendPasswordResetEmail(auth, forgetEmail)
       .then (result => {
            alert('Please check your email.');
       })
       .catch(error => {
            console.log(error);
            setError(error.message);
            setSuccess('');
       })
    }
    
    return (
        <div>
            <Form onSubmit={handelLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" ref={emailRef} required/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" required />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" /> 
                </Form.Group>
                <p>Forget Your Password? Please <span onClick={handelResetPassword}>Reset Password</span></p>
                <p>New to this website? Please <Link to='/register'>Register</Link></p>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>

        </div>
    );
};

export default Login;