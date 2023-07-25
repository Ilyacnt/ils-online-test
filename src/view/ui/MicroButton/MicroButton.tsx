import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from 'react'
import styles from './MicroButton.module.css'

interface MicroButtonProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    children?: ReactElement
}

const MicroButton = ({ children, onClick, ...attrs }: MicroButtonProps): JSX.Element => {
    return (
        <button
            className={styles.MicroButton}
            onClick={(event) => onClick && onClick(event)}
            {...attrs}
        >
            {children}
        </button>
    )
}

export default MicroButton
