import classNames from "classnames";
import React, { ReactNode } from "react"
import styles from "./Container.module.css"

type ContainerSize = "small" | "medium" | "full"

type Props = {
    centered?: boolean
    size?: ContainerSize
    children: ReactNode;
}

type ContainerProps = Props & React.HTMLAttributes<HTMLElement>

export const Container = ({ centered, size, children, className, ...props }: ContainerProps) => (
    <div
        {...props}
        className={classNames(styles.container, className, size ? styles[size] : styles.full, {
            [styles.centered]: centered
        })}
    >
        {children}
    </div>
)