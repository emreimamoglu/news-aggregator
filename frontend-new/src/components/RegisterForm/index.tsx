import styles from './styles.module.scss';
import classnames from 'classnames';
import twitterIcon from '../../assets/twitter.svg';
import facebookIcon from '../../assets/facebook.svg';
import googleIcon from '../../assets/google.svg';
import { Field, FieldProps, FormikProvider, useFormik } from 'formik';
import { useMutation } from 'react-query';
import AuthService from '../../services/Auth';
import * as yup from 'yup';
import { isValidDate } from '../../utils';

const RegisterForm = () => {

    const { mutate, isError, isLoading } = useMutation({
        mutationFn: AuthService.getInstance().register,
    });

    const handleSubmit = (values: any) => {
        mutate(values);
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email().required('Email*'),
        password: yup.string().min(8, "The password field must be at least 8 characters.").required('Password*'),
        password_confirmation: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
        name: yup.string().required('Name*'),
        surname: yup.string().required('Surname*'),
        month: yup.string().required('Month*').test('is-valid-month', 'Invalid month', function (value) {
            const { year, day } = this.parent;
            return isValidDate(year, value, day);
        }),
        day: yup.string().required('Day*').test('is-valid-day', 'Invalid day', function (value) {
            const { year, month } = this.parent;
            return isValidDate(year, month, value);
        }),
        year: yup.string().required('Year*').test('is-valid-year', 'Invalid year', function (value) {
            const { month, day } = this.parent;
            return isValidDate(value, month, day);
        }),
        location: yup.string().required('Location*'),
    });

    const formik = useFormik({
        initialValues: {
            email: undefined,
            password: undefined,
            name: undefined,
            surname: undefined,
            month: undefined,
            day: undefined,
            year: undefined,
            location: undefined,
        },
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
        validateOnChange: false,
        validateOnBlur: true,
    });
    console.log(formik.errors);

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.registerText}>
                    <h1>Create Your Account</h1>
                </div>
                {
                    isError && <div className={styles.errorContainer}>
                        <span>Invalid Content</span>
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
                        <Field name="password_confirmation">
                            {({ field, meta }: FieldProps) => (
                                <label id='password_confirmation_label'>
                                    <input type="password" placeholder=' ' {...field} className={classnames({
                                        [styles.errorInput]: meta.touched && meta.error,
                                    })} />
                                    {(meta.touched && meta.error) ? <span className={styles.errorSpan}>{meta.touched && meta.error}</span> : <span>Validate your password</span>}
                                </label>
                            )}
                        </Field>
                        <div className={styles.nameField}>
                            <Field name="name">
                                {({ field, meta }: FieldProps) => (
                                    <label id='first_name'>
                                        <input type="text" placeholder=' ' {...field} className={classnames({
                                            [styles.errorInput]: meta.touched && meta.error,
                                        })} />
                                        {(meta.touched && meta.error) ? <span className={styles.errorSpan}>{meta.touched && meta.error}</span> : <span>First name</span>}
                                    </label>
                                )}
                            </Field>
                            <Field name="surname">
                                {({ field, meta }: FieldProps) => (
                                    <label id='surname'>
                                        <input type="text" placeholder=' ' {...field} className={classnames({
                                            [styles.errorInput]: meta.touched && meta.error,
                                        })} />
                                        {(meta.touched && meta.error) ? <span className={styles.errorSpan}>{meta.touched && meta.error}</span> : <span>Last name</span>}
                                    </label>
                                )}
                            </Field>
                        </div>
                        <div className={styles.dateFields}>
                            <Field name="month">
                                {({ field, meta }: FieldProps) => (
                                    <label id='month'>
                                        <input type="text" placeholder=' ' {...field} className={classnames({
                                            [styles.errorInput]: meta.touched && meta.error,
                                        })} />
                                        {(meta.touched && meta.error) ? <span className={styles.errorSpan}>{meta.touched && meta.error}</span> : <span>Month</span>}
                                    </label>
                                )}
                            </Field>
                            <Field name="day">
                                {({ field, meta }: FieldProps) => (
                                    <label id='day'>
                                        <input type="text" placeholder=' ' {...field} className={classnames({
                                            [styles.errorInput]: meta.touched && meta.error,
                                        })} />
                                        {(meta.touched && meta.error) ? <span className={styles.errorSpan}>{meta.touched && meta.error}</span> : <span>Day</span>}
                                    </label>
                                )}
                            </Field>
                            <Field name="year">
                                {({ field, meta }: FieldProps) => (
                                    <label id='year'>
                                        <input type="text" placeholder=' ' {...field} className={classnames({
                                            [styles.errorInput]: meta.touched && meta.error,
                                        })} />
                                        {(meta.touched && meta.error) ? <span className={styles.errorSpan}>{meta.touched && meta.error}</span> : <span>Year</span>}
                                    </label>
                                )}
                            </Field>
                        </div>
                        <Field name="location" as="select">
                            <option disabled>Select Location</option>
                            <option value="usa" defaultChecked>USA</option>
                        </Field>
                        <button type='submit' disabled={isLoading} className={classnames({
                            [styles.disabledButton]: isLoading,
                        })}>Sign Up</button>
                    </form>
                </FormikProvider>

                <div className={styles.forgotPasswordOrUseAccount}>
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
    )
};

export default RegisterForm;