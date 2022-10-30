import classNames from "classnames";
import React, { ReactNode } from "react"

import styles from "./Button.module.css"

export type InternalButtonProps = {
    className?: string;
    primary?: boolean;
    small?: boolean;
    children: ReactNode;
}

type ButtonProps = InternalButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

export function getButtonClassesFromProps({ className, primary, small }: InternalButtonProps): string {
    return classNames(className, styles.button, {
        [styles.primary]: primary,
        [styles.small]: small,
    })
}

export const Button = (props: ButtonProps) => (
    <button
        className={getButtonClassesFromProps(props)}
        {...props}
    >
        {props.children}
    </button>
)