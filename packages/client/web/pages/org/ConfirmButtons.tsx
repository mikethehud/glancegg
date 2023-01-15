import { Button } from "../../components/button/Button"
import styles from "./Org.module.css"

interface ConfirmButtonProps {
    onConfirm: () => void
    onCancel: () => void
}

export const ConfirmButtons = ({ onConfirm, onCancel }: ConfirmButtonProps) => (
        <div className={styles.confirmButtons}>
            <Button xsmall primary onClick={onConfirm} variant="do">Save Changes</Button>
            <Button xsmall onClick={onCancel}>Dismiss</Button>
        </div>
)