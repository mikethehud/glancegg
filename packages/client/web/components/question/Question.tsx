import { PropsWithChildren, useState } from "react"
import { ResponseType } from "../../lib/graphql/generated/generated"
import { Card } from "../card/Card"
import styles from "./Question.module.css"
import { ScaleResponse } from "./QuestionTypes/ScaleResponse"
import { TextResponse } from "./QuestionTypes/TextResponse"

interface QuestionProps {
    questionType: string
    responseType: ResponseType
    text: string
}

export const Question = ({ text, responseType }: QuestionProps) => {
    const Response = () => {
        switch(responseType) {
            case ResponseType.Scale:
                return <ScaleResponse />
            case ResponseType.Text:
                return <TextResponse />
            case ResponseType.Task:
                return <ScaleResponse />
        }
        return null
    }

    return (
        <Card className={styles.question}>
            <div className={styles.text}>{text}</div>
            <Response />
        </Card>
    )
}

export const Questions = ({ children }: PropsWithChildren) => <div className={styles.questions}>{children}</div>