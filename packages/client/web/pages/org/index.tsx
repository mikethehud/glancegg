import { NextPage } from "next"
import styles from "./Org.module.css"
import { Layout } from "../../components/layout/Layout"
import { Role, useDeleteOrganizationMutation, useGetUserQuery, useLeaveOrganizationMutation, User } from "../../lib/graphql/generated/generated"
import { Button } from "../../components/button/Button"
import { FormError } from "../../components/formError/FormError"
import { Member } from "./Member"
import { useEffect, useState } from "react"
import { TextInput } from "../../components/textInput/TextInput"
import { useToast } from "../../lib/context/toastContext"
import { Section } from "../../components/container/Section"
import { Container } from "../../components/container/Container"
import { LayoutLoading } from "../../components/layout/LayoutLoading"
import { Redirect } from "../../components/redirect/Redirect"
import { RoleRestricted } from "../../components/role/Role"
import { removeToken } from "../../lib/jwt/jwt"
import { ConfirmDialog } from "../../components/dialog/Dialog"
import { useRouter } from "next/router"

const Org: NextPage = () => {
    const [deleteOrgDialog, setDeleteOrgDialog] = useState(false)
    const [leaveOrgDialog, setLeaveOrgDialog] = useState(false)
    const { showSuccessToast } = useToast()
    const { data, error, loading } = useGetUserQuery()
    const [deleteOrganization, deleteOrganizationResult] = useDeleteOrganizationMutation({
        refetchQueries: ['GetUser', 'GetOrganizationAndMembers'],
        onCompleted: () => {
            showSuccessToast("Organization deleted.")
            removeToken()
        }
    })
    const [leaveOrg, leaveOrgResult] = useLeaveOrganizationMutation({
        refetchQueries: ['GetUser'],
        onCompleted: () => {
            showSuccessToast("Left Organization.")
            removeToken()
        }
    })
    const [adminCount, setAdminCount] = useState(0)

    const handleInviteCopy = () => {
        navigator.clipboard.writeText(inviteURL)
        showSuccessToast("Invite link copied to clipboard")
    }

    useEffect(() => {
        if (data && data.user.organization) {
            setAdminCount(data.user.organization.members.reduce<number>(
                (acc, val) => val.role == Role.Admin ? acc + 1 : acc,
                0
            ))
        }
    }, [data, setAdminCount])

    if (loading || !data) return <LayoutLoading />
    if (!data.user.organization) return <Redirect to="/org/create" />
    if (error) return <Layout><FormError error={error.message}/></Layout>

    const organization = data.user.organization
    const inviteURL = "http://localhost:3000/invite/" + organization.id

    const getErrorMessage = (code: string): string => {
        switch (code) {
            case "LAST_ADMIN":
                return "An organization needs at least one admin."
            default:
                return "Unknown error."
        }
    }

    const ConfirmDeleteOrg = () => (
        <ConfirmDialog
            title="Delete Organization"
            content="By deleting this organization, all users use access to their data associated with this organization, including check-ins."
            okButtonText="Yes, Delete Organization"
            okButtonHandler={() => {
                deleteOrganization()
                setDeleteOrgDialog(false)
            }}
            onClose={() => setDeleteOrgDialog(false)}
        />
    )

    const ConfirmLeave = () => (
        <ConfirmDialog
            title="Leave Organization"
            content="By leaving this organization, you will lose access to your data associated with this organization, including check-ins."
            okButtonText="Yes, Leave Organization"
            okButtonHandler={() => {
                leaveOrg()
                setLeaveOrgDialog(false)
            }}
            onClose={() => setLeaveOrgDialog(false)}
        />
    )

    return (
        <>
            <Layout>
                <Container>
                    <Section className={styles.header}>
                        <h1>{organization.name}</h1>
                        <div>
                            <Button
                                primary
                                variant="caution"
                                xsmall
                                onClick={() => setLeaveOrgDialog(true)}
                                disabled={data.user.role === Role.Admin && adminCount === 1}
                            >
                                Leave Organization
                            </Button>
                        </div>
                    </Section>
                    <Section className={styles.members}>
                        {organization.members.map(user => (
                            <Member
                                isOnlyAdmin={user.role === Role.Admin && adminCount === 1}
                                user={user}
                                possibleReports={getPossibleReports(user, organization.members)}
                            />
                        ))}
                    </Section>
                    {leaveOrgResult.error && (
                        <FormError
                            error={getErrorMessage(leaveOrgResult.error.message)}
                        />
                    )}
                    {deleteOrganizationResult.error && (
                        <FormError
                            error={getErrorMessage(deleteOrganizationResult.error.message)}
                        />
                    )}
                    <RoleRestricted allowed={[Role.Admin]}>
                        <Section>
                            <h4>Invite team members</h4>
                            <Section className={styles.inviteButtons}>
                                <TextInput block disabled value={inviteURL} />
                                <Button primary small onClick={() => handleInviteCopy()}>Copy Link</Button>
                            </Section>
                        </Section>
                        <Section>
                            <Button onClick={() => setDeleteOrgDialog(true)} primary variant="caution" small>
                                Delete Organization
                            </Button>
                        </Section>
                    </RoleRestricted>
                </Container>
            </Layout>
            {deleteOrgDialog && <ConfirmDeleteOrg />}
            {leaveOrgDialog && <ConfirmLeave />}
        </>
    )
}

function getPossibleReports(user: User, users: User[]): User[] {
    return users.filter(n => n.id != user.id)
}

export default Org