import { Formik } from 'formik';

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
                    <form className="LoginForm">
                        {/* inputs? materialui? whatever i choose to use */}
                        {submitError
                            // ? displayerror I think some of the uis had good alert/error components or formik might have one
                            // : null
                        }
                        {/* submit button */}
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm;