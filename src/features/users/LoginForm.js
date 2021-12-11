import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { TextField, Button } from '@mui/material';
import './LoginForm.css';
import { loginUser } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlert from '../../app/ErrorAlert';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userError = useSelector(state => state.user.error);
    const token = useSelector(state => state.user.token);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (token && hasSubmitted) {
            navigate('/instruments');
        }
    }, [token, navigate, hasSubmitted])

    if (token) return <div>Logout button here</div>;

    return (
        <div className='LoginForm-div'>
            {userError
                ? <ErrorAlert error={userError}/>
                : null
            }
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Required';
                    } else if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        dispatch(loginUser(values));
                        resetForm();
                        setSubmitting(false);
                        setHasSubmitted(true);
                    } catch (e) {
                        resetForm();
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, errors, touched, handleChange, isSubmitting }) => (
                    <Form className="LoginForm">
                        <TextField
                            id='username'
                            name='username'
                            label='Username'
                            vairant='outlined'
                            onChange={handleChange}
                            value={values.username}
                            error={errors.username && touched.username ? true : false}
                            helperText={errors.username && touched.username ? `${errors.username}` : ' '}
                            margin='normal'
                            fullWidth
                            autoComplete='username'
                            color='primaryDark'
                        />
                        
                        <TextField
                            type='password'
                            id='password'
                            name='password'
                            label='Password'
                            vairant='outlined'
                            onChange={handleChange}
                            value={values.password}
                            error={errors.password && touched.password ? true : false}
                            helperText={errors.password && touched.password ? `${errors.password}` : ' '}
                            margin='normal'
                            fullWidth
                            autoComplete='current-password'
                            color='primaryDark'
                        />

                        <Button 
                            variant='contained' 
                            type='submit' 
                            disabled={isSubmitting}
                            fullWidth
                            color='primaryDark'
                        >
                            🎹 Login 🎹
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm;