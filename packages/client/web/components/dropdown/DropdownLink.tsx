import Link, { LinkProps } from "next/link"
import { FunctionComponent, PropsWithChildren } from "react"
import styles from "./Dropdown.module.css"

type DropdownLinkProps = { href: string } & PropsWithChildren

export const DropdownLink = ({ children, href }: DropdownLinkProps) => (
    <Link href={href}>
        <a className={styles.link}>{children}</a>
    </Link>
)