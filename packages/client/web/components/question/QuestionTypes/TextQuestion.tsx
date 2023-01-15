import { faPlus, faTimes, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { createRef, useEffect } from "react"
import { useRef } from "react"
import { AddButton } from "../../addButton/AddButton"
import { Button } from "../../button/Button"
import { IconButton } from "../../button/IconButton"
import { TextArea } from "../../textInput/TextArea"
import { TextInput } from "../../textInput/TextInput"
import { Question } from "../Question"
import styles from "./TextQuestion.module.css"

interface TextQuestionProps {
    text: string
    responses: string[]
    setResponses: (input: string[]) => void
}

export const TextQuestion = ({ text, responses, setResponses }: TextQuestionProps) => {
    const newInputRef = useRef(null)
    const inputRefs = responses.map(() => createRef<HTMLTextAreaElement>())

    const newResponse = () => {
        setResponses([...responses, ""])
    }

    const removeResponse = (i: number) => {
        const newResponses = [...responses]
        newResponses.splice(i, 1)
        setResponses(newResponses)
    }

    const updateResponse = (i: number, value: string) => {
        const newResponses = [...responses]
        newResponses[i] = value
        setResponses(newResponses)
    }

    const removeIfEmpty = (i: number, value: string) => {
        if(value === "" && responses.length > 1) {
            removeResponse(i)
        }
    }

    return (
        <Question text={text}>
            <div className={styles.wrapper}>
                {responses.map((response, i) => (
                    <TextArea
                        rows={1}
                        placeholder="..."
                        autoFocus
                        onChange={e => updateResponse(i, e.target.value)}
                        onBlur={e => removeIfEmpty(i, e.target.value)}
                        value={response}
                        ref={inputRefs[i]}
                        hoverButtons={responses.length > 1 ? [
                            { icon: faTimes, onClick: () => removeResponse(i) }
                        ] : undefined}
                    />
                ))}
                <AddButton onClick={() => newResponse()} />
            </div>
        </Question>
    )
}