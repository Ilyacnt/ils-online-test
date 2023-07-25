import styles from './Item.module.css'
import cn from 'classnames'
import { ReactComponent as PinIcon } from '../../assets/pin.svg'
import { ReactComponent as DeleteIcon } from '../../assets/delete-cross.svg'
import MicroButton from '../../ui/MicroButton/MicroButton'
import { useTypedDispatch, useTypedSelector } from '../../../store/hooks'
import { removeRoute, setCurrentRoute } from '../../../store/routes/routesSlice'

interface ItemProps {
    id: string
    name: string
    body: string
    // onClick: (event: React.MouseEvent<HTMLElement>) => void
}

const Item = ({ id, name, body }: ItemProps): JSX.Element => {
    const { currentRoute } = useTypedSelector((state) => state.routes)
    const dispatch = useTypedDispatch()

    return (
        <div
            className={cn(styles.Item, { [styles.Selected]: currentRoute === id })}
            onClick={() => dispatch(setCurrentRoute(id))}
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
