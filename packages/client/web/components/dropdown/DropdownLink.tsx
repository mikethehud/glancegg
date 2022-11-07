import classNames from "classnames"
import Link, { LinkProps } from "next/link"
import { AnchorHTMLAttributes, FunctionComponent, PropsWithChildren } from "react"
import styles from "./Dropdown.module.css"

type DropdownLinkProps = { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const DropdownLink = ({ children, href, className, ...attributes }: DropdownLinkProps) => (
    <Link href={href}>
        <a className={classNames(styles.link, className)} {...attributes}>{children}</a>
    </Link>
)