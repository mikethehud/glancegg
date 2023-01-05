import { faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { PropsWithChildren, useState } from "react"
import { Button } from "../../button/Button"
import { IconButton } from "../../button/IconButton"
import { TextInput } from "../../textInput/TextInput"
import styles from "./TextResponse.module.css"

interface TextResponseProps {
}

export const TextResponse = ({}: TextResponseProps) => {
    const [responses, setResponses] = useState<string[]>([])

    const addResponse = () => {
        setResponses(["", ...responses])
    }

    const removeResponse = (i: number) => {
        console.log(i)
        const newResponses = [...responses]
        newResponses.splice(i, 1)
        setResponses(newResponses)
    }

    const updateResponse = (i: number, value: string) => {
        const newResponses = [...responses]
        newResponses[i] = value
        setResponses(newResponses)
    }

    return (
        <div className={styles.wrapper}>
            <Button small variant="do" primary onClick={addResponse}>Add Response</Button>
            {responses.map((response, i) => (
                <div className={styles.response}>
                    <TextInput placeholder="..." onChange={e => updateResponse(i, e.target.value)} value={response} />
                    <button type="button" onClick={() => removeResponse(i)} className={styles.remove} tabIndex={-1}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
            ))}
        </div>
    )
}