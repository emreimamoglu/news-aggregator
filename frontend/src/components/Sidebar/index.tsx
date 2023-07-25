import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './styles.module.scss';

const Sidebar = () => {
    return(
        <div className={styles.container}>
            <RegisterForm/>
        </div>
    )
}


export default Sidebar;