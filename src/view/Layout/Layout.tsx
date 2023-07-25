import ItemList from '../components/ItemList/ItemList'
import Map from '../components/Map/Map'
import Divider from '../ui/Divider/Divider'
import styles from './Layout.module.css'

const Layout = (): JSX.Element => {
    return (
        <div className={styles.Layout}>
            <div className={styles.Sidebar}>
                <div className={styles.Header}>Список маршрутов</div>
                <Divider />
                <ItemList />
            </div>
            <div className={styles.Content}>
                <Map />
            </div>
        </div>
    )
}

export default Layout
