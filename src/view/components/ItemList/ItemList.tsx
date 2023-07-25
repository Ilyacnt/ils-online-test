import Item from '../Item/Item'
import styles from './ItemList.module.css'

const ItemList = () => {
    return (
        <div className={styles.ItemList}>
            <Item name="Маршрут 1" body="59.221 38.356" />
        </div>
    )
}

export default ItemList
