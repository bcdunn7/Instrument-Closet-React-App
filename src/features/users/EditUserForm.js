import { Formik, Form } from 'formik';
import { TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlert from '../../app/ErrorAlert';
import { updateUser } from './userSlice';

const EditUserForm = ({ userData }) => {
    const dispatch = useDispatch();  
    const userError = useSelector(state => state.user.error);


    return (
        <>
            {userError
                ? <ErrorAlert error={userError} dispAction='user/clearError' />
                : null
            }
            <div className='EditUserForm-div'>
                <Formik
                    enableReinitialize
                    initialValues={{
                        firstName: userData.firstName ? userData.firstName : '',
                        lastName: userData.lastName ? userData.lastName : '',
                        email: userData.email ? userData.email : '',
                        phone: userData.phone ? userData.phone : ''
                    }}
                    validate={values => {
                        const errors = {};
                            if (!values.firstName) {
                                errors.firstName = 'Required';
                            } else if (!values.lastName) {
                                errors.lastName = 'Required';
                            } else if (!values.email) {
                                errors.email = 'Required';
                            } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
                                errors.email = 'Not a valid email';
                            } else if (!values.phone) {
                                errors.phone = 'Required';
                            }
                            return errors;
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            dispatch(updateUser(userData.username, values));
                            setSubmitting(false);
                        } catch (e) {
                            console.error(e);
                            resetForm();
                            setSubmitting();
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, isSubmitting }) => (
                        <Form className='EditUserForm'>
                            <TextField
                                id='firstName'
                                name='firstName'
                                label='First Name'
                                variant='outlined'
                                onChange={handleChange}
                                value={values.firstName}
                                error={errors.firstName && touched.firstName ? true: false}
                                helperText={errors.firstName && touched.firstName ? `${errors.firstName}` : ' '}
                                margin='normal'
                                fullWidth
                                color='primaryDark'
                            />
                            
                            <TextField
                                id='lastName'
                                name='lastName'
                                label='Last Name'
                                variant='outlined'
                                onChange={handleChange}
                                value={values.lastName}
                                error={errors.lastName && touched.lastName ? true: false}
                                helperText={errors.lastName && touched.lastName ? `${errors.lastName}` : ' '}
                                margin='normal'
                                fullWidth
                                color='primaryDark'
                            />

                            <TextField
                                id='email'
                                name='email'
                                label='Email'
                                variant='outlined'
                                onChange={handleChange}
                                value={values.email}
                                error={errors.email && touched.email ? true: false}
                                helperText={errors.email && touched.email ? `${errors.email}` : ' '}
                                margin='normal'
                                fullWidth
                                color='primaryDark'
                            />

                            <TextField
                                id='phone'
                                name='phone'
                                label='Phone'
                                variant='outlined'
                                onChange={handleChange}
                                value={values.phone}
                                error={errors.phone && touched.phone ? true: false}
                                helperText={errors.phone && touched.phone ? `${errors.phone}` : ' '}
                                margin='normal'
                                fullWidth
                                color='primaryDark'
                            />

                            <Button
                                variant='contained'
                                type='submit'
                                disabled={isSubmitting}
                                fullWidth
                                color='primaryDark'
                            >
                                Save Changes
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default EditUserForm;