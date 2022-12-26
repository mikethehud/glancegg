import classNames from "classnames"
import { PropsWithChildren } from "react"
import { Button } from "../button/Button"
import styles from "./Dialog.module.css"

export interface DialogProps {
    title: string
    content: string,
    okButtonText?: string,
    okButtonHandler?: () => void,
    dismissButtonText?: string,
    onClose?: () => void
    className?: string
}

export interface ConfirmDialogProps {
    title: string
    content: string,
    okButtonText?: string,
    okButtonHandler?: () => void,
    onClose?: () => void
}

export const Dialog = ({ title, content, onClose, okButtonText, okButtonHandler, dismissButtonText, className }: DialogProps) => (
    <div className={classNames(className, styles.wrapper)} onClick={onClose}>
        <div className={styles.container} onClick={e => e.stopPropagation()}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>
                {content}
            </div>
            <div className={styles.buttons}>
                {dismissButtonText && <Button block onClick={onClose}>{dismissButtonText}</Button>}
                <Button block primary onClick={okButtonHandler || onClose}>{okButtonText || "OK"}</Button>
            </div>
        </div>
    </div>
)

export const ConfirmDialog = (props: ConfirmDialogProps) => (
    <Dialog
        className={styles.confirmDialog}
        dismissButtonText="Cancel"
        {...props}
    />
)