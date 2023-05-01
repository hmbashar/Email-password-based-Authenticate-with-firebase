import { signInWithEmailAndPassword, getAuth} from 'firebase/auth';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';



const auth = getAuth(app);


const Login = () => {

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');


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

    
    return (
        <div>
            <Form onSubmit={handelLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" required/>
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
                <p>New to this website? Please <Link to='/register'>Register</Link></p>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>

        </div>
    );
};

export default Login;