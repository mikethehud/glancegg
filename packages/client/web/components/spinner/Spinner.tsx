import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Spinner.module.css"

export const Spinner = () => (
    <FontAwesomeIcon className={styles.spinner} icon={faCircleNotch} />
)

export const PageSpinner = () => (
    <div className={styles.pageSpinner}>
        <Spinner />
    </div>
)