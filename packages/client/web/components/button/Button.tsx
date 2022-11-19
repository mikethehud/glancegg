import classNames from "classnames";
import React, { ReactNode } from "react"

import styles from "./Button.module.css"
import { Spinner } from "../spinner/Spinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    primary?: boolean;
    caution?: boolean;
    small?: boolean;
    xsmall?: boolean;
    loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, primary, small, xsmall, caution, loading, ...attributes }, forwardRef) => {
        const classes = classNames(className, styles.button, {
            [styles.primary]: primary,
            [styles.small]: small,
            [styles.xsmall]: xsmall,
            [styles.caution]: caution,
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