import classNames from "classnames";
import React from "react"

import styles from "./TextLink.module.css"

type Props = {
    primary?: boolean
}

type TextLinkProps = Props & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const TextLink = ({ primary, children, ...props }: TextLinkProps) => (
    <a
        {...props}
        className={classNames(styles.link, {
            [styles.primary]: primary,
        })}
    >
        {children}
    </a>
)