import classNames from "classnames"
import React from "react"
import styles from "./Select.module.css"

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ children, className, ...attributes }, forwardRef) => (
        <div className={classNames(className, styles.wrapper)}>
            <select {...attributes} className={styles.select} ref={forwardRef}>
                {children}
            </select>
        </div>
    )
)