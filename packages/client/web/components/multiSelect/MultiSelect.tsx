import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import React from "react"
import { useEffect, useState } from "react"
import { useOutsideClickCallback } from "../../lib/hooks/useOutsideClickCallback"
import { IconButton } from "../button/IconButton"
import styles from "./MultiSelect.module.css"

type SelectOption = {
    text: string
    value: string
}

interface MultiSelectProps {
    className: string
    placeholder: string
    negative?: boolean
    small?: boolean
    options: SelectOption[]
    onSelect: (values: string[]) => void
}

export const MultiSelect = ({ className, negative, small, placeholder, options, onSelect }: MultiSelectProps) => {
    const [values, setValues] = useState<string[]>([])
    const [open, setOpen] = useState(false)

    const addSelect = (option?: string) => {
        if(option) {
            setValues([...values, option])
        }
    }

    const removeSelect = (option: string) => {
        setValues(values.filter(v => v != option))
    }

    useEffect(() => {
        onSelect(values)
        setOpen(false)
    }, [values, setOpen])

    const availableOptions = options.filter(o => values.indexOf(o.value) < 0)
    const selectedOptions = options.filter(o => values.indexOf(o.value) >= 0)

    return (
        <div className={classNames(styles.wrapper, negative && styles.negative, small && styles.small, open && styles.open, className)} onClick={() => setOpen(true)}>
            <div className={styles.selected}>
                {selectedOptions.length
                    ? selectedOptions.map(s => <SelectedOption option={s} onRemove={removeSelect} />)
                    : placeholder
                }
            </div>
            <div className={styles.chevron}><FontAwesomeIcon icon={faChevronDown} /></div>
            {open && availableOptions.length > 0 && <SelectPopover options={availableOptions} onSelect={addSelect} onClose={() => setOpen(false)} />}
        </div>
    )
}

interface SelectedOptionProps {
    option: SelectOption
    onRemove: (value: string) => void
}

const SelectedOption = ({ option, onRemove }: SelectedOptionProps) => {
    const handleX = (e: React.MouseEvent, value: string) => {
        e.stopPropagation
        onRemove(value)
    }
    return (
        <div className={styles.selectedOption} onClick={e => e.stopPropagation()}>
            {option.text}
            <div onClick={e => handleX(e, option.value)} className={styles.remove}>
                &times;
            </div>
        </div>
    )
}

interface SelectPopoverProps {
    options: SelectOption[]
    onSelect: (value: string) => void
    onClose: () => void
}

export const SelectPopover = ({ options, onSelect, onClose }: SelectPopoverProps) => {
    const ref = React.createRef<HTMLDivElement>()
    useOutsideClickCallback(ref, () => { onClose(); })

    return (
        <div className={styles.popover} ref={ref}>
            {options.map(o => <div className={styles.option} onClick={() => onSelect(o.value)}>{o.text}</div>)}
        </div>
    )
}