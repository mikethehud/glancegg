import classNames from "classnames";
import React, { ReactNode } from "react"

import styles from "./Button.module.css"
import { Spinner } from "../spinner/Spinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    primary?: boolean;
    small?: boolean;
    loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, primary, small, loading, ...attributes }, forwardRef) => {
        const classes = classNames(className, styles.button, {
            [styles.primary]: primary,
            [styles.small]: small,
        })

        return (
            <button
                className={classes}
                ref={forwardRef}
                {...attributes}
                disabled={attributes.disabled || loading}
            >
                {loading && <Spinner />}
                {attributes.children}
            </button>
        )
    }
)