import { useEffect } from "@storybook/addons"
import classNames from "classnames"
import { PropsWithChildren, useState } from "react"
import { ResponseInput } from "../../../lib/graphql/generated/generated"
import { Question } from "../Question"
import styles from "./ScaleQuestion.module.css"

interface ScaleResponseProps {
    text: string
    response?: number
    setResponse: (input: number) => void
}

export const ScaleQuestion = ({ text, response, setResponse }: ScaleResponseProps) => {
    const numbers = []
    for (let i = 1; i <= 5; i++) {
        numbers.push(<div className={classNames(styles.number, response == i && styles.active)} onClick={() => setResponse(i)}>{i}</div>);
    }

    return (
        <Question text={text}>
            <div className={styles.scale}>
                {numbers}
            </div>
        </Question>
    )
}

interface NumberProps extends PropsWithChildren {
    active?: boolean
    onClick: () => void
}