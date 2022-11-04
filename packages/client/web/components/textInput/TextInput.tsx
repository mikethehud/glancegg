import classNames from "classnames";
import React from "react"
import styles from "./TextInput.module.css"

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ error, ...attributes }, forwardRef) => (
        <>
            <input
                className={classNames(styles.textInput, {
                    [styles.error]: error
                })}
                {...attributes}
                ref={forwardRef}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </>
    )
)