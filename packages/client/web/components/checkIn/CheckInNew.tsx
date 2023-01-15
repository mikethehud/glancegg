import classNames from "classnames"
import { useState } from "react"
import { ResponseInput, ResponseType, useCreateShoutOutMutation, useSubmitCheckInResponsesMutation } from "../../lib/graphql/generated/generated"
import { AddButton } from "../addButton/AddButton"
import { Button } from "../button/Button"
import { Section } from "../container/Section"
import { FormError } from "../formError/FormError"
import { Question } from "../question/Question"
import { ScaleQuestion } from "../question/QuestionTypes/ScaleQuestion"
import { TextQuestion } from "../question/QuestionTypes/TextQuestion"
import { ShoutOutForm, ShoutOutInput } from "../shoutOut/ShoutOutForm"
import styles from "./CheckIn.module.css"

interface CheckInNewProps {
    checkIn: {
        id: string
        questions: Array<{
            id: string
            text: string
            responseType: ResponseType
        }>
    }
}

export type GenericResponse = string[] | number

interface Responses<T> {
    [index: string]: T
}

interface ShoutOutInputWithError extends ShoutOutInput {
    error?: string
}

export const CheckInNew = ({ checkIn }: CheckInNewProps) => {
    const [submitCheckIn] = useSubmitCheckInResponsesMutation()
    const [createShoutOut] = useCreateShoutOutMutation()
    const [textResponses, setTextResponses] = useState<Responses<string[]>>({})
    const [scaleResponses, setScaleResponses] = useState<Responses<number>>({})
    const [shoutOuts, setShoutOuts] = useState<ShoutOutInputWithError[]>([])

    function validateQuestions(): boolean {
        var valid = true
        checkIn.questions.forEach(q => {
            const tr = textResponses[q.id] && textResponses[q.id].filter(t => t !== "")
            const sr = scaleResponses[q.id]

            if (q.responseType == ResponseType.Text && !tr || (tr && !tr.length)) {
                valid = false
            }
            if (q.responseType == ResponseType.Task && !tr || (tr && !tr.length)) {
                valid = false
            }
            if (q.responseType == ResponseType.Scale && !sr) {
                valid = false
            }
        })

        return valid
    }

    function validateShoutOuts(): boolean {
        var valid = true
        shoutOuts.forEach((s, i) => {
            if(!s.receiverIDs.length || !s.shoutOut) {
                valid = false
                setShoutOutError(i, "Please select at least one team member and fill out the message.")
            }
        })
        return valid
    }

    function addShoutOut() {
        setShoutOuts([...shoutOuts, {receiverIDs:[], shoutOut: ""}])
    }

    function removeShoutOut(i: number) {
        const newShoutOuts = [...shoutOuts]
        newShoutOuts.splice(i, 1)
        setShoutOuts(newShoutOuts)
    }

    function updateShoutOut(i: number) {
        return function(s: ShoutOutInput) {
            const newShoutOuts = [...shoutOuts]
            newShoutOuts[i] = s
            setShoutOuts(newShoutOuts)
        }
    }

    function setShoutOutError(i: number, e: string) {
        const newShoutOuts = [...shoutOuts]
        newShoutOuts[i].error = e;
        setShoutOuts(newShoutOuts)
    }
    
    function getFlatResponses(): ResponseInput[] {
        var result: ResponseInput[] = []

        Object.keys(textResponses).forEach(id => {
            const r = textResponses[id]
            r.forEach((res, i) => result.push({ questionID: id, position: i, response: res }))
        })

        Object.keys(scaleResponses).forEach(id => {
            const r = scaleResponses[id]
            result.push({ questionID: id, position: 0, response: r.toString() })
        })

        return result
    }
    
    function submit() {
        if(!validateShoutOuts()) {
            // return early if shoutouts not valid
            return
        }

        submitCheckIn({
            variables: {
                input: {
                    checkInID: checkIn.id,
                    responses: getFlatResponses()
                }
            }
        })
        shoutOuts.forEach(s => {
            if(s.shoutOut) {
                createShoutOut({
                    variables: {
                        input: {
                            ...s,
                            checkInID: checkIn.id,
                        }
                    }
                })
            }
        })
    }

    function respondScale(questionID: string) {
        return function(response: number) {
            setScaleResponses({
                ...scaleResponses,
                [questionID]: response
            })
        }
    }

    function respondText(questionID: string) {
        return function(response: string[]) {
            setTextResponses({
                ...textResponses,
                [questionID]: response
            })
        }
    }

    console.log(shoutOuts)

    return (
        <Section>
            <div className={classNames(styles.questions, styles.withPanel)}>
                {checkIn.questions.map(
                    ({id, responseType, text}) => {
                        switch(responseType) {
                            case ResponseType.Scale:
                                return <ScaleQuestion text={text} response={scaleResponses[id]} setResponse={respondScale(id)} />
                            case ResponseType.Text:
                            case ResponseType.Task:
                                return <TextQuestion text={text} responses={textResponses[id] || [""]} setResponses={respondText(id)} />
                        }
                    }
                )}
                <Question text="Give a shout out">
                    <>
                        <p className={styles.explainer}>
                            Celebrate your team mates by giving them a shout out for the work they've put in. These will be shared publicly.
                        </p>
                        {shoutOuts.map((s,i) => (
                            <div>
                                <div className={styles.singleShoutOut}>
                                    <div className={styles.singleForm}>
                                        <ShoutOutForm onUpdate={updateShoutOut(i)} shoutOut={s} onRemove={() => removeShoutOut(i)} />
                                    </div>
                                </div>
                                {s.error && <FormError error={s.error} />}
                            </div>
                        ))}
                        <AddButton onClick={() => addShoutOut()} />
                    </>
                </Question>
            </div>
            <div className={styles.submit}>
                <Button primary onClick={() => submit()} disabled={!validateQuestions()}>Submit Check-In</Button>
            </div>
        </Section>
    )
}