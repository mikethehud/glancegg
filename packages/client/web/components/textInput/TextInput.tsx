import classNames from "classnames";
import React from "react"
import styles from "./TextInput.module.css"

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    block?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ error, block, ...attributes }, forwardRef) => (
        <>
            <input
                className={classNames(styles.textInput, {
                    [styles.error]: error,
                    [styles.block]: block,
                })}
                {...attributes}
                ref={forwardRef}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </>
    )
)