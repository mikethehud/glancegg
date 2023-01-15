import { faBullhorn, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "../card/Card"
import styles from "./ShoutOut.module.css"
import { PartialShoutOut, PartialShoutOutUser } from "./ShoutOutList"

export const ShoutOut = ({ user, receivers, shoutOut, createdAt }: PartialShoutOut) => (
    <Card className={styles.shoutOut}>
        <div className={styles.date}>
            {new Date(createdAt).toDateString()}
        </div>
        <div className={styles.people}>
            {getName(user)}
            <div className={styles.arrow}>&rarr;</div>
            {receivers.map((r, i) => (
                <>
                    {i != 0 && `, `}
                    {getName(r)}
                </>
            ))}
        </div>
        <div className={styles.text}>
            {shoutOut}
        </div>
    </Card>
)

function getName(u: PartialShoutOutUser): string {
    return `${u.firstName} ${u.lastName.charAt(0)}.`
}