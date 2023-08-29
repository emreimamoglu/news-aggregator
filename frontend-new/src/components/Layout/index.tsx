import { ReactNode } from "react"
import styles from './styles.module.scss'

const Layout = ({ children } : {
    children: ReactNode
}) => {
    return (
        <section id="layout" className={styles.layout}>
            {children}
        </section>
    )
}

export default Layout;