import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { IconButton } from "../button/IconButton"
import { Section } from "../container/Section"
import styles from "./AddButton.module.css"

interface AddButtonProps {
    onClick: () => void
}

export const AddButton = ({ onClick }: AddButtonProps) => <Section className={styles.wrapper}>
    <IconButton small icon={faPlus} variant="info" onClick={() => onClick()} className={styles.button} />
</Section>