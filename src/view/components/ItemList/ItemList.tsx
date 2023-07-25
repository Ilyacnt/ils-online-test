import { useTypedSelector } from '../../../store/hooks'
import Item from '../Item/Item'
import styles from './ItemList.module.css'

const ItemList = (): JSX.Element => {
    const { routes } = useTypedSelector((store) => store.routes)

    return (
        <div className={styles.ItemList}>
            {routes.map((route) => (
                <Item
                    key={route.id}
                    id={route.id}
                    name={route.name}
                    body={`${route.points[0].lat} ${route.points[0].lng}`}
                />
            ))}
        </div>
    )
}

export default ItemList
