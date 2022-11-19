import classNames from "classnames"
import styles from "./Avatar.module.css"

type AvatarProps = {
    name?: string
    image?: JSX.Element
} & React.HTMLAttributes<HTMLElement>

const getInitial = (name?: string): string => {
    return name ? name.charAt(0) : ""
}

export const Avatar = ({ name, image, className }: AvatarProps) => (
    <div className={classNames(styles.avatar, className)}>
        {image ? image : getInitial(name)}
    </div>
)