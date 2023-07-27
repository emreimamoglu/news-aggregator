import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { RegisterFormData } from '@/interfaces';
import AuthService from '@/services/Auth';
import * as yup from 'yup';
import { Field, FieldProps, FormikProps, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { TextField } from '@mui/material';

const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handleAlreadyHaveClick = () => {
        router.push('/');
    }

    const handleSubmit = (values: RegisterFormData) => {
        AuthService.getInstance().register(values).then((response) => {
            enqueueSnackbar('Register successful', { variant: 'success' });
            router.push('/');
        }).catch((error) => {
            enqueueSnackbar('Register failed', { variant: 'error' });
        });
    };

    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required"),
        password: yup.string()
            .required("Please enter a password")
            .min(8, "Password must have at least 8 characters"),
        password_confirmation: yup.string()
            .required("Please re-type your password")
            .oneOf([yup.ref("password")], "Passwords does not match"),
    });

    const formik: FormikProps<RegisterFormData> = useFormik<RegisterFormData>({
        initialValues: formData,
        validationSchema,
        onSubmit: handleSubmit,
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: true,
    });

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.container}>
                    <Field name="name">
                        {({ form: { handleChange }, meta }: FieldProps) => (
                            <TextField
                                id="name"
                                placeholder="Name"
                                variant="outlined"
                                value={formik.values.name}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    </Field>

                    <Field name="email">
                        {({ form: { handleChange }, meta }: FieldProps) => (
                            <TextField
                                id="email"
                                placeholder="Email"
                                variant="outlined"
                                value={formik.values.email}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    </Field>
                    <Field name="password">
                        {({ form: { handleChange }, meta }: FieldProps) => (
                            <TextField
                                id="password"
                                placeholder="Password"
                                type='password'
                                variant="outlined"
                                value={formik.values.password}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    </Field>
                    <Field name="password_confirmation">
                        {({ form: { handleChange }, meta }: FieldProps) => (
                            <TextField
                                id="password_confirmation"
                                placeholder="Confirm Password"
                                variant="outlined"
                                type='password'
                                value={formik.values.password_confirmation}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    </Field>
                    <button type="submit">Sign up</button>
                    <a onClick={handleAlreadyHaveClick}>{"Already have an account ?"}</a>
                </div>
            </form>
        </FormikProvider>
    )
};

export default RegisterForm;