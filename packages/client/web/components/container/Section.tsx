import { split } from "@apollo/client";
import classNames from "classnames";
import React from "react"
import styles from "./Section.module.css"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    split?: boolean
}

export const Section = ({ className, children, split, ...props }: SectionProps) => (
    <section
        {...props}
        className={classNames(styles.section, className, { [styles.split]: split })}
    >
        {children}
    </section>
)