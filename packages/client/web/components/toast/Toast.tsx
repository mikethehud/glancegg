import classnames from "classnames"
import React from "react"
import styles from "./Toast.module.css"

export interface ToastProps {
    style?: 'success' | 'info' | 'error',
    text: string
}

export const AnimationClasses = {
    enter: styles.animateEnter,
    exit: styles.animateExit,
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    ({ style, text }, ref) => (
        <div className={classnames(styles.toast, style && styles[style])} ref={ref}>
            {text}
        </div>
    )
)