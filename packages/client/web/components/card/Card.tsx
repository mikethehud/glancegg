import classNames from "classnames"
import React from "react"
import styles from "./Card.module.css"

type CardProps = React.HTMLAttributes<HTMLDivElement> &  {
    hoverEffect?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, hoverEffect, ...attributes }, forwardRef) => {
        return (
            <div
                className={classNames(styles.card, hoverEffect && styles.hoverEffect, className)}
                ref={forwardRef}
                {...attributes}
            >
                {children}
            </div>
        )
    }
)