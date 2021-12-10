import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { registerUser } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlert from '../../app/ErrorAlert';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
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

    return (
        <div className='SignupForm'>
            <h2 className='SignupForm-heading'>Make An Account</h2>
            {userError
                ? <ErrorAlert error={userError}/>
                : null
            }
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: ''
                }}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Required';
                    } else if (!values.password) {
                        errors.password = 'Required';
                    } else if (!values.firstName) {
                        errors.firstName = 'Required';
                    } else if (!values.lastName) {
                        errors.lastName = 'Required';
                    } else if (!values.email) {
                        errors.password = 'Required';
                    } else if (!values.phone) {
                        errors.phone = 'Required';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                        dispatch(registerUser(values));
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
                    <Form className="SignupForm-form">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    id='username'
                                    name='username'
                                    label='Username'
                                    variant='outlined'
                                    onChange={handleChange}
                                    value={values.username}
                                    error={errors.username && touched.username ? true : false}
                                    helperText={errors.username && touched.username ? `${errors.username}` : ' '}
                                    margin='normal'
                                    autoComplete='username'
                                    color='primaryDark'
                                />

                                <TextField
                                type='password'
                                    id='password'
                                    name='password'
                                    label='Password'
                                    variant='outlined'
                                    onChange={handleChange}
                                    value={values.password}
                                    error={errors.password && touched.password ? true : false}
                                    helperText={errors.password && touched.password ? `${errors.password}` : ' '}
                                    margin='normal'
                                    autoComplete='current-password'
                                    color='primaryDark'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='firstName'
                                    name='firstName'
                                    label='First Name'
                                    variant='outlined'
                                    onChange={handleChange}
                                    value={values.firstName}
                                    error={errors.firstName && touched.firstName ? true : false}
                                    helperText={errors.firstName && touched.firstName ? `${errors.firstName}` : ' '}
                                    margin='normal'
                                    autoComplete='given-name'
                                    color='primaryDark'
                                />
                            
                                <TextField
                                    id='lastName'
                                    name='lastName'
                                    label='Last Name'
                                    variant='outlined'
                                    onChange={handleChange}
                                    value={values.lastName}
                                    error={errors.lastName && touched.lastName ? true : false}
                                    helperText={errors.lastName && touched.lastName ? `${errors.lastName}` : ' '}
                                    margin='normal'
                                    autoComplete='family-name'
                                    color='primaryDark'
                                />
                            </Grid>
                            <Grid item xs={12}>       
                                <TextField
                                    id='email'
                                    name='email'
                                    label='Email'
                                    variant='outlined'
                                    onChange={handleChange}
                                    value={values.email}
                                    error={errors.email && touched.email ? true : false}
                                    helperText={errors.email && touched.email ? `${errors.email}` : ' '}
                                    margin='normal'
                                    autoComplete='email'
                                    color='primaryDark'
                                />
                                
                                <TextField
                                    id='phone'
                                    name='phone'
                                    label='Phone'
                                    variant='outlined'
                                    onChange={handleChange}
                                    value={values.phone}
                                    error={errors.phone && touched.phone ? true : false}
                                    helperText={errors.phone && touched.phone ? `${errors.phone}` : ' '}
                                    margin='normal'
                                    autoComplete='tel-national'
                                    color='primaryDark'
                                />
                            </Grid>
                        </Grid>

                        <Button 
                            variant='contained' 
                            type='submit' 
                            disabled={isSubmitting}
                            color='primaryDark'
                        >
                            Sign me up!
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignupForm;