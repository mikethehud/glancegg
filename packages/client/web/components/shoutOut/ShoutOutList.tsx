import { ShoutOut } from "./ShoutOut"
import styles from "./ShoutOut.module.css"

export type PartialShoutOutUser = {
    firstName: string
    lastName: string
}

export type PartialShoutOut = {
    user: PartialShoutOutUser
    receivers: PartialShoutOutUser[]
    shoutOut: string
    createdAt: any
}

interface ShoutOutListProps {
    shoutOuts: PartialShoutOut[]
}

export const ShoutOutList = ({ shoutOuts }: ShoutOutListProps) => {

    return (
        <>
            {shoutOuts.map(s => (
                <ShoutOut
                    user={s.user}
                    receivers={s.receivers}
                    shoutOut={s.shoutOut}
                    createdAt={s.createdAt}
                />
            ))}
        </>
    )
}