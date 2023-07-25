import styles from './Item.module.css'
import cn from 'classnames'
import { ReactComponent as PinIcon } from '../../assets/pin.svg'
import { ReactComponent as DeleteIcon } from '../../assets/delete-cross.svg'
import MicroButton from '../../ui/MicroButton/MicroButton'
import { useTypedDispatch, useTypedSelector } from '../../../store/hooks'
import {
    fetchPolylineDataStart,
    removeRoute,
    setCurrentRoute,
} from '../../../store/routes/routesSlice'
import { getCurrentRouteIndex } from '../../../utils/getCurrentRoute'

interface ItemProps {
    id: string
    name: string
    body: string
}

const Item = ({ id, name, body }: ItemProps): JSX.Element => {
    const { currentRouteId, routes } = useTypedSelector((state) => state.routes)
    const dispatch = useTypedDispatch()

    const onItemClickHandler = () => {
        dispatch(setCurrentRoute(id))
        if (currentRouteId) {
            let currentRouteIndex = getCurrentRouteIndex(currentRouteId)
            dispatch(
                fetchPolylineDataStart({
                    id: currentRouteId,
                    points: routes[currentRouteIndex].points,
                })
            )
        }
    }

    return (
        <div
            className={cn(styles.Item, { [styles.Selected]: currentRouteId === id })}
            onClick={onItemClickHandler}
        >
            <div className={styles.Head}>
                <PinIcon />
                <span>{name}</span>
            </div>
            <div className={styles.Body}>
                <span>{body}</span>
                <MicroButton onClick={() => dispatch(removeRoute(id))}>
                    <DeleteIcon />
                </MicroButton>
            </div>
        </div>
    )
}

export default Item
