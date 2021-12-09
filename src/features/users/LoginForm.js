import { Formik, Form } from 'formik';
import { TextField, Button } from '@mui/material';
import './LoginForm.css';
import { loginUser } from './userSlice';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
    const dispatch = useDispatch();
    let submitError = null;

    return (
        <div className='LoginForm-div'>
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
                        submitError = null;
                        dispatch(loginUser(values));
                        resetForm();
                        setSubmitting(false);
                        // navigate
                    } catch (e) {
                        submitError = e;
                        resetForm();
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, errors, touched, handleChange, isSubmitting, initialValues }) => (
                    <Form className="LoginForm">
                        <TextField
                            id='username'
                            name='username'
                            label='Username'
                            vairant='filled'
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

                        {submitError
                            ? <div>{submitError}</div>
                            : null
                        }

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