import { useState } from "react"
import { Button } from "../../components/button/Button"
import { ConfirmDialog } from "../../components/dialog/Dialog"
import { FormError } from "../../components/formError/FormError"
import { useToast } from "../../lib/context/toastContext"
import { Role, useGetUserQuery, useLeaveOrganizationMutation } from "../../lib/graphql/generated/generated"
import { removeToken } from "../../lib/jwt/jwt"
import { getErrorMessage } from "../../lib/util/errors"
import { countAdmins } from "../../lib/util/organization"

export const LeaveOrg = () => {
    const { data } = useGetUserQuery()
    const { showSuccessToast } = useToast()
    const [open, setOpen] = useState(false)
    const [leaveOrg, leaveOrgResult] = useLeaveOrganizationMutation({
        refetchQueries: ['GetUser'],
        onCompleted: () => {
            showSuccessToast("Left Organization.")
            removeToken()
        }
    })

    const ConfirmLeave = () => (
        <ConfirmDialog
            title="Leave Organization"
            content="By leaving this organization, you will lose access to your data associated with this organization, including check-ins."
            okButtonText="Yes, Leave Organization"
            okButtonHandler={() => {
                leaveOrg()
                setOpen(false)
            }}
            onClose={() => setOpen(false)}
        />
    )

    if (!data || !data.user.organization) {
        return <></>
    }

    return (
        <>
            {open && <ConfirmLeave />}
            <Button
                primary
                variant="caution"
                onClick={() => setOpen(true)}
                disabled={!data || data.user.role === Role.Admin && countAdmins(data.user.organization.members) == 1}
            >
                Leave Organization
            </Button>
            {leaveOrgResult.error && (
                <FormError
                    error={getErrorMessage(leaveOrgResult.error.message)}
                />
            )}
        </>
    )


}