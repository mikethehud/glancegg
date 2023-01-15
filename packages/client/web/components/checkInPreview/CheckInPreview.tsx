import classNames from "classnames"
import Link from "next/link"
import { Avatar } from "../avatar/Avatar"
import styles from "./CheckInPreview.module.css"

interface CheckInPreviewProps {
    id: string
    completedAt?: EpochTimeStamp
    reviewedAt?: EpochTimeStamp
    expiresAt: EpochTimeStamp
    expired?: boolean
    user?: {
        firstName: string
        lastName: string
    }
    isReviewer?: boolean
}

export const CheckInPreivew = ({ id, completedAt, reviewedAt, expired, expiresAt, user, isReviewer }: CheckInPreviewProps) => {
    const expiresDate = new Date(expiresAt)

    const currentCheckIn = isReviewer ? !expired && completedAt && !reviewedAt : !expired && !completedAt
    const isClickable = isReviewer ? Boolean(completedAt) : Boolean(!expired || completedAt)

    const Content = ({ clickable }: { clickable?: boolean }) => (
        <div className={classNames(styles.checkInPreview, currentCheckIn && styles.currentCheckIn, clickable && styles.clickable)}>
            <div className={styles.checkInPreviewTitle}><strong>Check-In</strong> due {expiresDate.toDateString()}</div>
            {user ? <div className={styles.checkInPreviewUser}><Avatar name={user.firstName} /> {user.firstName} {user.lastName}</div> : <span />}
            <CheckInStatus expired={expired} completedAt={completedAt} reviewedAt={reviewedAt} />
        </div>
    )

    if (isClickable) {
        return (
            <Link href={`/check_ins/${id}`}>
                <div>
                    <Content clickable />
                </div>
            </Link>
        )
    }

    return <Content />
}

interface CheckInStatusProps {
    expired?: boolean
    completedAt?: EpochTimeStamp
    reviewedAt?: EpochTimeStamp
}

const CheckInStatus = ({ expired, completedAt, reviewedAt }: CheckInStatusProps) => {
    if (reviewedAt) {
        return <div className={classNames(styles.checkInStatus, styles.reviewed)}>Reviewed</div>
    }
    if (completedAt) {
        return <div className={classNames(styles.checkInStatus, styles.completed)}>In Review</div>
    }
    if (expired) {
        return <div className={classNames(styles.checkInStatus, styles.expired)}>Expired</div>
    }
    return <div className={classNames(styles.checkInStatus, styles.new)}>Current</div>
}