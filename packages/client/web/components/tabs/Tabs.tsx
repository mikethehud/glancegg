import classNames from "classnames";
import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from "./Tabs.module.css"

export const Tabs = ({ children }: PropsWithChildren) => <div className={styles.tabs}>{children}</div>

interface TabProps extends PropsWithChildren {
    href: string
    active?: boolean
}

export const Tab = ({ href, active, children }: TabProps) => {
    const classes = classNames(
        styles.tab,
        active && styles.active
    )
    
    return (
        <Link href={href}>
            <div className={classes}>
                {children}
            </div>
        </Link>
    )
}