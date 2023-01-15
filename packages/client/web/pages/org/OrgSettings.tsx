import classNames from "classnames"
import { useForm } from "react-hook-form"
import { Card } from "../../components/card/Card"
import { Section } from "../../components/container/Section"
import { FormElement } from "../../components/formElement/FormElement"
import { FormError } from "../../components/formError/FormError"
import { Select } from "../../components/select/Select"
import { useToast } from "../../lib/context/toastContext"
import { useUpdateOrgSettingsMutation } from "../../lib/graphql/generated/generated"
import { getErrorMessage } from "../../lib/util/errors"
import { timezones } from "../../lib/util/timezones"
import { ConfirmButtons } from "./ConfirmButtons"
import styles from "./Org.module.css"


interface OrgSettingsInputs {
    timezone: string
    checkInWeekday: number
}

interface OrgSettingsProps {
    organization: OrgSettingsInputs
}

export const OrgSettings = ({ organization: { timezone, checkInWeekday }}: OrgSettingsProps) => {
    const defaultValues: OrgSettingsInputs = {
        timezone,
        checkInWeekday
    }
    const { showSuccessToast } = useToast()
    const { register, getValues, reset, formState: { isDirty } } = useForm<OrgSettingsInputs>({ defaultValues })
    const [updateOrgSettings, updateOrgSettingsResult] = useUpdateOrgSettingsMutation({
    onCompleted: () => {
            showSuccessToast("Organization settings updated.")
            reset(getValues())
        }
    })

    const commitUpdates = () => {
        updateOrgSettings({
            variables: {
                input: getValues()
            }
        })
    }

    return (
        <div className={styles.orgSettings}>
            <Card className={classNames(isDirty && styles.dirty)}>
                <Section>
                    <FormElement label="Timezone">
                        <Select {...register("timezone")}>
                            {timezones.map(t => <option value={t}>{t}</option>)}
                        </Select>
                    </FormElement>
                </Section>
                <Section>
                    <FormElement label="Check-Ins Due Day">
                        <Select {...register("checkInWeekday")}>
                            <option value={1}>Monday</option>
                            <option value={2}>Tuesday</option>
                            <option value={3}>Wednesday</option>
                            <option value={4}>Thursday</option>
                            <option value={5}>Friday</option>
                            <option value={6}>Saturday</option>
                            <option value={0}>Sunday</option>
                        </Select>
                    </FormElement>
                </Section>
            </Card>
            {isDirty && <ConfirmButtons onConfirm={() => commitUpdates()} onCancel={() => reset()} />}
            {updateOrgSettingsResult.error && (
                <FormError
                    error={getErrorMessage(updateOrgSettingsResult.error.message)}
                />
            )}
        </div>
    )
}