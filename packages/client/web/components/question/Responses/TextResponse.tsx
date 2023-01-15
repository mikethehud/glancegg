import { Card } from "../../card/Card"
import { Question } from "../Question"
import styles from "./TextResponse.module.css"

interface TextResponseProps {
    text: string
    responses: Array<{
        id:string
        response:string
}>
}

export const TextResponse = ({ text, responses }: TextResponseProps) => {
    if (!responses) {
        return <div>No responses</div>
    }
    
    return (
        <Question text={text}>
            <div className={styles.wrapper}>
                {responses.map(r => <Card>{r.response}</Card>)}
            </div>
        </Question>
    )
}