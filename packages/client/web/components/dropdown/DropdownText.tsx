import classNames from "classnames"
import styles from "./Dropdown.module.css"

type DropdownTextProps = React.HTMLAttributes<HTMLDivElement>

export const DropdownText = ({ children, className, ...attributes }: DropdownTextProps) => (
    <div className={classNames(styles.text, className)} {...attributes}>{children}</div>
)