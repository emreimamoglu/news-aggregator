import styles from './styles.module.scss';
import classnames from 'classnames';
import twitterIcon from '../../assets/twitter.svg';
import facebookIcon from '../../assets/facebook.svg';
import googleIcon from '../../assets/google.svg';
import { Field, FieldProps, FormikProvider, useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import AuthService from '../../services/Auth';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';
import { useEffect, useRef, useState } from 'react';

const RegisterForm = () => {
    const [registered, setRegistered] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const navigate = useNavigate();
    const { mutateAsync, isError, isLoading } = useMutation({
        mutationFn: AuthService.getInstance().register,
    });

    const handleSubmit = async (values: any) => {
        const newValues = {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation
        }
        await mutateAsync(newValues);
        setRegistered(true);

        timerRef.current = setTimeout(() => {
            navigate(Routes.LOGIN);
        }, 2000);
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email().required('Email*'),
        password: yup.string().min(8, "The password field must be at least 8 characters.").required('Password*'),
        password_confirmation: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
        name: yup.string().required('Name*'),
    });

    const formik = useFormik({
        initialValues: {
            email: undefined,
            password: undefined,
            name: undefined,
            month: undefined,
            day: undefined,
            year: undefined,
        },
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
        validateOnChange: false,
        validateOnBlur: true,
    });

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        }
    }, [])

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
                {
                    registered && <div className={styles.successContainer}>
                        <span>Registered Successfully,Redirecting</span>
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
                                    <label id='name'>
                                        <input type="text" placeholder=' ' {...field} className={classnames({
                                            [styles.errorInput]: meta.touched && meta.error,
                                        })} />
                                        {(meta.touched && meta.error) ? <span className={styles.errorSpan}>{meta.touched && meta.error}</span> : <span>Enter your Name</span>}
                                    </label>
                                )}
                            </Field>
                        </div>
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