import { Formik, Form, Field } from 'formik';

const LoginForm = () => {
    let submitError = null;

    return (
        <div>
            <h2>Login</h2>
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
                        //log user in via api
                        // do something with store?
                        resetForm();
                        setSubmitting(false);
                        //history.push('/') or maybe instruments page?
                    } catch (e) {
                        submitError = e;
                        resetForm();
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, errors, touched, handleChange, isSubmitting, initialValues }) => (
                    <Form className="LoginForm">
                        <div>
                            <label htmlFor="username">Username</label>
                            <Field id="username" name="username" placeholder="username" autoComplete="username" />
                            {errors.username ? <small>{errors.username}</small> : '👍'}
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Field id="password" name="password" placeholder="password" type="password" autoComplete="current-password" />
                            {errors.password ? <small>{errors.password}</small> : '👍'}
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

export default LoginForm;