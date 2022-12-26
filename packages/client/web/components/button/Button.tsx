import classNames from "classnames";
import React, { ReactNode } from "react"

import styles from "./Button.module.css"
import { Spinner } from "../spinner/Spinner";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonVariant = 'do' | 'caution'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    primary?: boolean;
    variant?: ButtonVariant;
    small?: boolean;
    xsmall?: boolean;
    loading?: boolean;
    icon?: IconProp;
    block?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, primary, small, xsmall, variant, block, loading, icon, ...attributes }, forwardRef) => {
        const classes = classNames(className, styles.button, variant && styles[variant], {
            [styles.primary]: primary,
            [styles.small]: small,
            [styles.xsmall]: xsmall,
            [styles.block]: block,
        })

        return (
            <button
                className={classes}
                ref={forwardRef}
                {...attributes}
                disabled={attributes.disabled || loading}
            >
                {loading && <Spinner />}
                {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
                {attributes.children}
            </button>
        )
    }
)