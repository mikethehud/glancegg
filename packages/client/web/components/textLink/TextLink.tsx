import classNames from "classnames";
import React from "react"

import styles from "./TextLink.module.css"

type Props = {
}

type TextLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    primary?: boolean
}

export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
    ({ primary, children, ...props }, forwardRef) => (
        <a
            {...props}
            className={classNames(styles.link, {
                [styles.primary]: primary,
            })}
            ref={forwardRef}
        >
            {children}
        </a>
    )
)