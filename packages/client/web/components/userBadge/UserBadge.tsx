import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { Avatar } from "../avatar/Avatar"
import { Spinner } from "../spinner/Spinner"
import styles from "./UserBadge.module.css"

interface UserBadgeProps {
    name?: string
    active?: boolean
    onClick?: () => void
    loading?: boolean
}

export const UserBadge = ({ name, active, loading, onClick }: UserBadgeProps) => {
    const getInitial = (name?: string): string => {
        return name ? name.charAt(0) : ""
    }

    if(loading) {
        return (
            <div className={classNames(styles.userBadge, styles.loading)}>
                <div className={styles.badge}>
                    <Spinner />
                </div>
                <FontAwesomeIcon className={styles.chevron} icon={faChevronDown} />
            </div>
        )
    }

    return (
        <div className={classNames(styles.userBadge, active && styles.active)} onClick={onClick}>
            <Avatar initial={getInitial(name)} />
            <FontAwesomeIcon className={styles.chevron} icon={faChevronDown} />
        </div>
    )
}