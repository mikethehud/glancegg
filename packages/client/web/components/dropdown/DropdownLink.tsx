import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import Link, { LinkProps } from "next/link"
import { AnchorHTMLAttributes, FunctionComponent, PropsWithChildren } from "react"
import styles from "./Dropdown.module.css"

interface DropdownLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    icon?: IconProp
    href: string
}

export const DropdownLink = ({ children, href, icon, className, ...attributes }: DropdownLinkProps) => (
    <Link href={href}>
        <div className={styles.linkWrapper}>
            {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
            <a className={classNames(styles.link, className)} {...attributes}>{children}</a>
        </div>
    </Link>
)