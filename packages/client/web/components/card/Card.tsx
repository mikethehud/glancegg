import classNames from "classnames"
import React from "react"
import styles from "./Card.module.css"

export const Card = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...attributes }, forwardRef) => {
        return (
            <div
                className={classNames(styles.card, className)}
                ref={forwardRef}
                {...attributes}
            >
                {children}
            </div>
        )
    }
)