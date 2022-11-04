import classNames from "classnames";
import React, { ReactNode } from "react"
import styles from "./Section.module.css"
import { Navigation } from "../layout/navigation/NavigationPublic";

type SectionSize = "small" | "medium" | "full"

type Props = {
    centered?: boolean
    size?: SectionSize
    children: ReactNode;
}

type SectionProps = Props & React.HTMLAttributes<HTMLElement>

export const Section = ({ centered, size, children, className, ...props }: SectionProps) => (
    <section
        {...props}
        className={classNames(styles.section, className, size && styles[size], {
            [styles.centered]: centered
        })}
    >
        {children}
    </section>
)