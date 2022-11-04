import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import styles from "./UserBadge.module.css"

interface UserBadgeProps {
    name: string
    active?: boolean
    onClick: () => void
}

export const UserBadge = ({ name, active, onClick }: UserBadgeProps) => (
    <div className={classNames(styles.userBadge, active && styles.active)} onClick={onClick}>
        <div className={styles.badge}>
            {name.charAt(0)}
        </div>
        <FontAwesomeIcon className={styles.chevron} icon={faChevronDown} />
    </div>
)