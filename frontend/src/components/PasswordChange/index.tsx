import { TextField } from '@mui/material';
import styles from './styles.module.scss';
import * as yup from 'yup';
import { ChangePasswordFormData, RegisterFormData } from '@/interfaces';
import { Field, FieldProps, FormikProps, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import AuthService from '@/services/Auth';
import { clearLocalStorage } from '@/config/axios';
import { useRouter } from 'next/router';

const PasswordChange = () => {
    const [formData, setFormData] = useState<ChangePasswordFormData>({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    })

    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();

    const handleSubmit = (values: ChangePasswordFormData) => {
        AuthService.getInstance().changePassword(values).then(() => {
            enqueueSnackbar("Password changed successfully", {variant: "success"});
        }).catch((error) => {
            enqueueSnackbar("Password change failed", {variant: "error"});
        });
     }

    const validationSchema = yup.object({
        current_password: yup.string().required("Password is required"),
        new_password: yup.string()
            .required("Please enter the new password")
            .min(8, "Password must have at least 8 characters"),
        new_password_confirmation: yup.string()
            .required("Please re-type your password")
            .oneOf([yup.ref("new_password")], "Passwords does not match"),
    });

    const formik: FormikProps<ChangePasswordFormData> = useFormik<ChangePasswordFormData>({
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
                    <p className={styles.text}>Change your password</p>
                    <div className={styles.infos}>
                        <Field name="current_password">
                            {({ form: { handleChange }, meta }: FieldProps) => (
                                <TextField
                                    id="current_password"
                                    placeholder="Current Password"
                                    type='password'
                                    variant="outlined"
                                    value={formik.values.current_password}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                />
                            )}
                        </Field>
                        <Field name="new_password">
                            {({ form: { handleChange }, meta }: FieldProps) => (
                                <TextField
                                    id="new_password"
                                    placeholder="New Password"
                                    type='password'
                                    variant="outlined"
                                    value={formik.values.new_password}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                />
                            )}
                        </Field>
                        <Field name="new_password_confirmation">
                            {({ form: { handleChange }, meta }: FieldProps) => (
                                <TextField
                                    id="new_password_confirmation"
                                    placeholder="Confirm New Password"
                                    variant="outlined"
                                    type='password'
                                    value={formik.values.new_password_confirmation}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                />
                            )}
                        </Field>
                        <div className={styles.buttonContainer}>
                            <button className={styles.button}>Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </FormikProvider>
    )
};

export default PasswordChange;