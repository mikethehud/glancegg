import classNames from "classnames"
import { Question } from "../Question"
import styles from "./ScaleResponse.module.css"

interface ScaleResponseProps {
    text: string
    response: {
        id:string
        response:string
    }
}

export const ScaleResponse = ({ text, response }: ScaleResponseProps) => {
    const n = parseInt(response.response)
    const numbers = []
    for (let i = 1; i <= 5; i++) {
        numbers.push(<div className={classNames(styles.number, n == i && styles.active)}>{i}</div>);
    }

    return (
        <Question text={text}>
            <div className={styles.text}>{text}</div>
            <div className={styles.scale}>
                {numbers}
            </div>
        </Question>
    )
}