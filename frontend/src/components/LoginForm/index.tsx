import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import AuthService from '@/services/Auth';
import { Field, FieldProps, FormikHelpers, FormikProps, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { LoginFormData } from '@/interfaces';
import { useState } from 'react';
import { useUserContext } from '@/contexts/User';
import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const router = useRouter();
    const { setUser } = useUserContext();
    const { enqueueSnackbar } = useSnackbar();

    const handleCreateAccountClick = () => {
        router.push('/register');
    };

    const handleSubmit = (values: LoginFormData) => {
        AuthService.getInstance().login(values).then((response) => {
            if (typeof window !== "undefined") {
                localStorage.setItem('access_token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
              }
            enqueueSnackbar('Login successful', { variant: 'success' });
            setUser(response.data.user);
        }).catch((error) => {
            enqueueSnackbar('Login failed', { variant: 'error' });
        });
    };

    const validationSchema = yup.object({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const formik: FormikProps<LoginFormData> = useFormik<LoginFormData>({
        initialValues: formData,
        validationSchema,
        onSubmit: handleSubmit,
        validateOnMount: false,
        validateOnBlur: true,
    });

    console.log(formik.errors);


    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.container}>
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
                    <button type="submit">Log in</button>
                    <a onClick={handleCreateAccountClick}>{"Create new account >"}</a>
                </div>
            </form>
        </FormikProvider>
    )
};

export default LoginForm;