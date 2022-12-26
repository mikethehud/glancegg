import { Avatar } from "../../components/avatar/Avatar"
import { Card } from "../../components/card/Card"
import { RoleRestricted } from "../../components/role/Role"
import { faCheck, faUserTimes, faX } from "@fortawesome/free-solid-svg-icons"
import { IconButton } from "../../components/button/IconButton"
import { Select } from "../../components/select/Select"
import { Role, User, useRemoveUserFromOrganizationMutation, useUpdateUserPermissionsMutation } from "../../lib/graphql/generated/generated"
import styles from "./Org.module.css"
import { Spinner } from "../../components/spinner/Spinner"
import { Section } from "../../components/container/Section"
import { Controller, useForm } from "react-hook-form"
import { Button } from "../../components/button/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames"
import { useToast } from "../../lib/context/toastContext"
import { Dialog } from "../../components/dialog/Dialog"
import { useEffect, useState } from "react"
import { FormError } from "../../components/formError/FormError"

interface SettingProps {
    title: string
    children: React.ReactNode
    loading?: boolean
    dirty?: boolean
    className?: string
}

export const Setting = ({title, children, loading, className}: SettingProps) => {
    return (
        <div className={classNames(styles.setting, className)}>
            <strong>{title}</strong>
            <div className={styles.settingContent}>
                {loading && <div className={styles.settingSpinner}><Spinner /></div>}
                {children}
            </div>
        </div>
    )
}

interface MemberData {
    user: User
    possibleReports: User[]
    isOnlyAdmin: boolean
}

interface MemberInputs {
    reportsTo: string
    role: string
}

export const Member = ({ user, possibleReports, isOnlyAdmin }: MemberData) => {
    const defaultValues: MemberInputs = {
        reportsTo: user.reportsTo || "",
        role: user.role
    }
    const { showSuccessToast } = useToast()
    const { register, getValues, reset, formState: { isDirty, dirtyFields } } = useForm<MemberInputs>({defaultValues})
    const [updateUser, { error: updateUserError }] = useUpdateUserPermissionsMutation({
        onCompleted: () => {
            showSuccessToast(`Permissions for ${user.firstName} ${user.lastName} have been updated`)
            reset({
                reportsTo: getValues("reportsTo"),
                role: getValues("role")
            })
        }
    })
    const [removeUser, { error: removeUserError }] = useRemoveUserFromOrganizationMutation({
        onCompleted: () => showSuccessToast(`${user.firstName} ${user.lastName} was removed from the organization`)
    })
    const [showRemoveDialog, setShowRemoveDialog] = useState(false)

    const commitUpdates = () => {
        updateUser({
            variables: {
                userID: user.id,
                input: {
                    reportsTo: dirtyFields.reportsTo ? getValues("reportsTo") : undefined,
                    role: dirtyFields.role ? getValues("role") : undefined
                }
            }
        })
    }

    const removeUserFromOrg = () => {
        removeUser({
            variables: {
                userID: user.id
            }
        })
    }

    const RemoveUserDialog = () => (
        <Dialog
            title="Remove user"
            content={`Do you want to remove ${user.firstName} ${user.lastName}`}
            onClose={() => setShowRemoveDialog(false)}
            okButtonHandler={() => removeUserFromOrg()}
        />
    )

    return (
        <div>
            {showRemoveDialog && <RemoveUserDialog />}
            <Card className={classNames(styles.member, isDirty && styles.dirty)}>
                <Section className={styles.data}>
                    <div className={styles.name}>
                        <Avatar name={user.firstName} className={styles.avatar} />
                        <strong>{user.firstName} {user.lastName}</strong>
                    </div>
                    <div className={styles.email}>{user.email}</div>
                </Section>
                <RoleRestricted allowed={[Role.Admin]}>
                    <Section className={styles.settings}>
                        <Setting title="Reports To" className={styles.reportsTo}>
                            <Select defaultValue={user.reportsTo || ""} {...register("reportsTo")}>
                                <option value={""}>&mdash;</option>
                                {possibleReports.map(report => <option value={report.id}>{report.firstName} {report.lastName}</option>)}
                            </Select>
                        </Setting>
                        <Setting title="Role" className={styles.role}>
                            <Select defaultValue={user.role} {...register("role")}>
                                {/* Only show User as option if there is more than one admin */}
                                <option value="USER" disabled={isOnlyAdmin}>User</option>
                                <option value="ADMIN">Admin</option>
                            </Select>
                        </Setting>
                        <IconButton disabled={isOnlyAdmin} onClick={() => setShowRemoveDialog(true)} icon={faUserTimes} small variant="caution" primary />
                    </Section>
                </RoleRestricted>
            </Card>
            {isDirty && (
                <div className={styles.confirmButtons}>
                    <Button xsmall primary onClick={() => commitUpdates()} variant="do">Save Changes</Button>
                    <Button xsmall onClick={() => reset()}>Dismiss</Button>
                </div>
            )}
            {removeUserError && <FormError error={removeUserError.message} />}
            {updateUserError && <FormError error={updateUserError.message} />}
        </div>
    )
}