import { Formik, Form, Field } from 'formik';

const SignupForm = () => {
    let submitError = null;

    return (
        <div>
            <h2>Signup</h2>
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
                onSubmit={async (values, { setSubitting, resetForm }) => {
                    try {
                        submitError = null;
                        //signup user
                        //store something maybe
                        resetForm();
                        setSubitting(false);
                        //history.push somthing
                    } catch (e) {
                        submitError = e;
                        resetForm();
                        setSubitting(false);
                    }
                }}
            >
                {({ values, errors, touched, handleChange, isSubmitting, initialValues }) => (
                    <Form className="SignupForm">
                        <div>
                            <label htmlFor="username">Username</label>
                            <Field id="username" name="username" placeholder="username" autoComplete="username" />
                            {errors.username ? <small>{errors.username}</small> : '👍'}
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Field id="password" name="password" placeholder="password" autoComplete="current-password" />
                            {errors.password ? <small>{errors.password}</small> : '👍'}
                        </div>

                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field id="firstName" name="firstName" placeholder="Joe" autoComplete="given-name" />
                            {errors.firstName ? <small>{errors.firstName}</small> : '👍'}
                        </div>

                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field id="lastName" name="lastName" placeholder="Smith" autoComplete="family-name" />
                            {errors.lastName ? <small>{errors.lastName}</small> : '👍'}
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <Field id="email" name="email" placeholder="user@email.com" autoComplete="email" />
                            {errors.email ? <small>{errors.email}</small> : '👍'}
                        </div>

                        <div>
                            <label htmlFor="phone">Phone</label>
                            <Field id="phone" name="phone" placeholder="785-555-1234" autoComplete="tel-national" />
                            {errors.phone ? <small>{errors.phone}</small> : '👍'}
                        </div>

                        <button type="submit">Login</button>
                        {submitError
                            ? <div>{submitError}</div>
                            : null
                        }
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignupForm;