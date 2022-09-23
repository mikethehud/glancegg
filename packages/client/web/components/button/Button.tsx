import React from "react"

import styles from "./Button.module.css"

type ButtonProps = {
    negative: boolean;
    children: JSX.Element;
}

export const Button = ({ negative, children }: ButtonProps) => <button className={styles.button}>{children}</button>