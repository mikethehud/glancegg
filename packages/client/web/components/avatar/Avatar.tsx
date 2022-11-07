import styles from "./Avatar.module.css"

interface AvatarProps {
    initial?: string
    image?: JSX.Element
}

export const Avatar = ({ initial, image }: AvatarProps) => (
    <div className={styles.avatar}>
        {image ? image : initial}
    </div>
)