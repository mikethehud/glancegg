import classNames from "classnames";
import React, { ReactNode } from "react"
import { HoverButton, HoverButtons } from "./HoverButtons";
import styles from "./TextInput.module.css"

type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
    error?: string;
    block?: boolean;
    rows?: number;
    hoverButtons?: HoverButton[]
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ error, block, className, rows, hoverButtons, ...attributes }, forwardRef) => (
        <div className={styles.wrapper}>
            <textarea
                rows={rows || 3}
                className={classNames(className, styles.textArea, {
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