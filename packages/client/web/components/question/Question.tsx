import { PropsWithChildren } from "react"
import styles from "./Question.module.css"

interface QuestionProps extends PropsWithChildren {
    text: string
}

export const Question = ({ children, text }: QuestionProps) => (
    <div className={styles.question}>
        <div className={styles.text}>{text}</div>
        {children}
    </div>
)