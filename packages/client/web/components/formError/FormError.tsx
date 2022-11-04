import classNames from "classnames";
import React, { ReactNode } from "react"
import styles from "./FormError.module.css"

type FormErrorProps = {
    error?: string;
}

export const FormError = ({ error }: FormErrorProps) => <div className={styles.formError}>{error}</div>