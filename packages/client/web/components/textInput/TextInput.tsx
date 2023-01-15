import classNames from "classnames";
import React, { ReactNode } from "react"
import { HoverButton, HoverButtons } from "./HoverButtons";
import styles from "./TextInput.module.css"

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    block?: boolean;
    hoverButtons?: HoverButton[]
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ error, block, className, hoverButtons, ...attributes }, forwardRef) => (
        <div className={styles.wrapper}>
            <input
                className={classNames(className, styles.textInput, {
                    [styles.error]: error,
                    [styles.block]: block,
                })}
                {...attributes}
                ref={forwardRef}
            />
            {hoverButtons && <HoverButtons buttons={hoverButtons} />}
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    )
)