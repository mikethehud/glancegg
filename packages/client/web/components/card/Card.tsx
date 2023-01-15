import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import React from "react"
import styles from "./Card.module.css"

type CardProps = React.HTMLAttributes<HTMLDivElement> &  {
    hoverEffect?: boolean
    shadow?: boolean
    icon?: IconProp
    iconVariant?: 'caution' | 'do'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, hoverEffect, shadow, icon, iconVariant, ...attributes }, forwardRef) => {
        return (
            <div
                className={classNames(styles.card, hoverEffect && styles.hoverEffect, shadow && styles.shadow, className)}
                ref={forwardRef}
                {...attributes}
            >
                {icon && <div className={classNames(styles.icon, iconVariant && styles[iconVariant])}><FontAwesomeIcon icon={icon} /></div>}
                {children}
            </div>
        )
    }
)