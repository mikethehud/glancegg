import React from "react"
import { FunctionComponent, PropsWithChildren } from "react"
import styles from "./Dropdown.module.css"

export const Dropdown = React.forwardRef<HTMLDivElement, PropsWithChildren>(
    ({ children }, ref) => (
        <div className={styles.anchor} ref={ref}>
            <div className={styles.arrow} />
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    {children}
                </div>
            </div>
        </div>
    )
)