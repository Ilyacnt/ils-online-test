import styles from './Item.module.css'
import { ReactComponent as PinIcon } from '../../assets/pin.svg'
import { ReactComponent as DeleteIcon } from '../../assets/delete-cross.svg'
import MicroButton from '../../ui/MicroButton/MicroButton'

interface ItemProps {
    name: string
    body: string
}

const Item = ({ name, body }: ItemProps) => {
    return (
        <div className={styles.Item}>
            <div className={styles.Head}>
                <PinIcon />
                <span>{name}</span>
            </div>
            <div className={styles.Body}>
                <span>{body}</span>
                <MicroButton>
                    <DeleteIcon />
                </MicroButton>
            </div>
        </div>
    )
}

export default Item
