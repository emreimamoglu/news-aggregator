import styles from './styles.module.scss';
import twitterIcon from '../../assets/twitter.svg';
import facebookIcon from '../../assets/facebook.svg';
import googleIcon from '../../assets/google.svg';
import classnames from 'classnames';
import { Field, FieldProps, FormikProvider, useFormik } from 'formik';
import AuthService from '../../services/Auth';
import * as yup from 'yup';
import { useMutation } from 'react-query';

const LoginForm = () => {

    const { mutate, isError, isLoading } = useMutation({
        mutationFn: AuthService.getInstance().login,
    });
    
    const handleSubmit = (values: any) => {
        mutate(values);
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email().required('Email*'),
        password: yup.string().min(8, "The password field must be at least 8 characters.").required('Password*'),
    });

    const formik = useFormik({
        initialValues: {
            email: undefined,
            password: undefined,
        },
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
        validateOnChange: false,
        validateOnBlur: true,
    });

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.loginText}>
                    <h1>Login</h1>
                </div>
                {
                    isError && <div className={styles.errorContainer}>
                        <span>Invalid email or password</span>
                    </div>
                }
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <Field name="email">
                            {({ field, meta }: FieldProps) => (
                                <label id='email_label'>
                                    <input type="text" placeholder=' ' {...field} className={classnames({
                                        [styles.errorInput]: meta.touched && meta.error,
                                    })} />
                                    {(meta.touched && meta.error) ? <span className={styles.errorSpan}>{meta.touched && meta.error}</span> : <span>Enter your email address</span>}
                                </label>
                            )}
                        </Field>
                        <Field name="password">
                            {({ field, meta }: FieldProps) => (
                                <label id='password_label'>
                                    <input type="password" placeholder=' ' {...field} className={classnames({
                                        [styles.errorInput]: meta.touched && meta.error,
                                    })} />
                                    {(meta.touched && meta.error) ? <span className={styles.errorSpan}>{meta.touched && meta.error}</span> : <span>Enter your password</span>}
                                </label>
                            )}
                        </Field>
                        <button type='submit' disabled={isLoading} className={classnames({
                            [styles.disabledButton]: isLoading,
                        })}>Login</button>
                    </form>
                </FormikProvider>

                <div className={styles.forgotPasswordOrUseAccount}>
                    <a>Forgot Password?</a>
                    <p>or use account</p>
                </div>

                <div className={styles.socialMediaButtons}>
                    <button className={classnames(
                        styles.socialMediaButton,
                        styles.twitterButton
                    )}><img src={twitterIcon} />Twitter</button>
                    <button className={classnames(
                        styles.socialMediaButton,
                        styles.facebookButton
                    )}><img src={facebookIcon} />Facebook</button>
                    <button className={classnames(
                        styles.socialMediaButton,
                        styles.googleButton
                    )}><img src={googleIcon} />Google</button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;