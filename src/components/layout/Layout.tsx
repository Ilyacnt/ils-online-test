import styles from './Layout.module.css'

const Layout = () => {
    return (
        <div className={styles.Layout}>
            <div className={styles.Sidebar}>Sidebar</div>
            <div className={styles.Content}>Content</div>
        </div>
    )
}

export default Layout
