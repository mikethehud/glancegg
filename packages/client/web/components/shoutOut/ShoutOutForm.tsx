import { faTimes } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"
import { useState } from "react"
import { useCreateShoutOutMutation, useGetOrganizationAndMembersQuery } from "../../lib/graphql/generated/generated"
import { Button } from "../button/Button"
import { MultiSelect } from "../multiSelect/MultiSelect"
import { Spinner } from "../spinner/Spinner"
import { TextArea } from "../textInput/TextArea"
import styles from "./ShoutOut.module.css"

export type ShoutOutInput = {
    shoutOut: string
    receiverIDs: string[]   
}

interface ShoutOutFormProps {
    shoutOut: ShoutOutInput,
    onUpdate: (s: ShoutOutInput) => void
    onRemove: () => void
}

export const ShoutOutForm = ({ shoutOut: { shoutOut, receiverIDs }, onUpdate, onRemove }: ShoutOutFormProps) => {
    const { data, loading } = useGetOrganizationAndMembersQuery()

    function updateReceivers(r: string[]) {
        onUpdate({ shoutOut, receiverIDs: r })
    }

    function updateMessage(m: string) {
        onUpdate({ shoutOut: m, receiverIDs })
    }

    if (loading) {
        return <Spinner />
    }

    if (!data || !data.organization) {
        return <div>Error loading organization members.</div>
    }

    const receiverOptions = data.organization.members.map(m => ({
        text: `${m.firstName} ${m.lastName}`,
        value: m.id,
    }))

    const hasContent = receiverIDs.length > 0 || shoutOut

    return (
        <div className={classNames(styles.shoutOutForm)}>
            <TextArea
                placeholder="Enter your message..."
                className={styles.formTextArea}
                rows={2}
                block
                value={shoutOut}
                onChange={e => updateMessage(e.target.value)}
                hoverButtons={[
                    {icon: faTimes, onClick: onRemove}
                ]}
            />
            <MultiSelect
                className={styles.formSelect}
                placeholder="Select team mates..."
                options={receiverOptions}
                onSelect={options => updateReceivers(options)}
                small
                negative
            />
        </div>
    )
}