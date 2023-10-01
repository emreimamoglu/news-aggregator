import { Field, FieldProps, FormikProvider, useFormik } from 'formik';
import styles from './styles.module.scss';
import classnames from 'classnames';
import * as yup from 'yup';
import AuthService from '../../services/Auth';
import { RegisterFormData } from '../../types/Auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import ImageUploader from '../../components/ImageUploader';

const AccountSettings = () => {

    const {data : user,isLoading : isUserLoading} = useQuery({
        queryKey: ['me'],
        queryFn: () => AuthService.getInstance().me()
    })

    const {mutateAsync} = useMutation({
        mutationFn: (values : RegisterFormData) => AuthService.getInstance().updateMe(values)
    })

    const validationSchema = yup.object().shape({
        email: yup.string().email().required('Email*'),
        password: yup.string().min(8, "The password field must be at least 8 characters.").required('Password*'),
        password_confirmation: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
        name: yup.string().required('Name*'),
    });

    const handleSubmit = async(values: RegisterFormData) => {
        await mutateAsync(values)
    }

    const handleFile = (file: File) => {
        console.log(file);
    };

    const formik = useFormik({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
        enableReinitialize : true,
    })
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Manage Account</h1>
            </div>
            <div className={styles.formAndImage}>
                <div className={styles.form}>
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={styles.nameField}>
                                <Field name="name">
                                    {({ field, meta }: FieldProps) => (
                                        <div className={styles.nameField}>
                                            <label id='name'>
                                                <input disabled={isUserLoading} type="text" placeholder=' ' {...field} className={classnames({
                                                    [styles.errorInput]: meta.touched && meta.error,
                                                })} />
                                                {(meta.touched && meta.error) ? <span className={styles.errorSpan}>{meta.touched && meta.error}</span> : <span>Name</span>}
                                            </label>
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className={styles.emailPasswordField}>
                                <Field name="email">
                                    {({ field, meta }: FieldProps) => (
                                        <label id='email_label'>
                                            <input disabled={isUserLoading} type="text" placeholder=' ' {...field} className={classnames({
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
                            </div>
                            <div className={styles.buttons}>
                                <button>Delete My Account</button>
                                <button>Save Changes</button>
                            </div>
                        </form>
                    </FormikProvider>
                </div>
                <div className={styles.profilePicture}>
                    <div className={styles.profile}>
                        EI
                    </div>
                    <ImageUploader handleFile={handleFile}/>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;