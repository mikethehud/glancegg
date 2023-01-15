import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TextInput.module.css"

export type HoverButton = {
    icon: IconProp
    onClick: () => void
}

type HoverButtonProps = {
    buttons: HoverButton[]
}

export const HoverButtons = ({ buttons }: HoverButtonProps) => (
    <div className={styles.hoverButtonWrapper}>
        {buttons.map(b => <div className={styles.hoverButton} onClick={b.onClick}><FontAwesomeIcon icon={b.icon} /></div>)}
    </div>
)