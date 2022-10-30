import classNames from "classnames";
import React, { ReactNode } from "react"
import styles from "./FormElement.module.css"

type FormElementProps = {
    label?: string;
    children: ReactNode;
}

export const FormElement = ({ label, children }: FormElementProps) => (
    <div
        className={classNames(styles.formElement)}
    >
        {label && <label>{label}</label>}
        {children}
    </div>
)