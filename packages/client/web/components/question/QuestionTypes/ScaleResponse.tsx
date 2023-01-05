import classNames from "classnames"
import { PropsWithChildren, useState } from "react"
import styles from "./ScaleResponse.module.css"

interface ScaleResponseProps {
}

export const ScaleResponse = ({}: ScaleResponseProps) => {
    const [value, setValue] = useState<number|undefined>()

    const numbers = []
    for (let i = 1; i <= 5; i++) {
        numbers.push(<div className={classNames(styles.number, value == i && styles.active)} onClick={() => setValue(i)}>{i}</div>);
    }

    return (
        <div className={styles.scale}>
            {numbers}
        </div>
    )
}

interface NumberProps extends PropsWithChildren {
    active?: boolean
    onClick: () => void
}