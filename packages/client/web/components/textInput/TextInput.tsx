import classNames from "classnames";
import React from "react"
import styles from "./TextInput.module.css"

type Props = {
    placeholder?: string;
    error?: string;
    type?: React.HTMLInputTypeAttribute
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & Props

export const TextInput = ({ error, placeholder, type, ...attributes } : TextInputProps) => (
    <>
        <input
            type={type}
            placeholder={placeholder}
            className={classNames(styles.textInput, {
                [styles.error]: error
            })}
            {...attributes}
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
    </>
)