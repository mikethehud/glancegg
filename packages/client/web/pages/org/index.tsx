import { NextPage } from "next"
import styles from "./Org.module.css"
import { Layout } from "../../components/layout/Layout"
import { Role, useDeleteOrganizationMutation, useGetUserQuery, useLeaveOrganizationMutation, User, useUpdateReportsToMutation } from "../../lib/graphql/generated/generated"
import { Button } from "../../components/button/Button"
import { FormError } from "../../components/formError/FormError"
import { Member } from "./Member"
import { useEffect, useState } from "react"
import { useToast } from "../../lib/context/toastContext"
import { Section } from "../../components/container/Section"
import { Container } from "../../components/container/Container"
import { Redirect } from "../../components/redirect/Redirect"
import { RoleRestricted } from "../../components/role/Role"
import { removeToken } from "../../lib/jwt/jwt"
import { ConfirmDialog } from "../../components/dialog/Dialog"
import { Invite } from "../../components/invite/Invite"
import { OrgSettings } from "./OrgSettings"
import { countAdmins } from "../../lib/util/organization"

const Org: NextPage = () => {
    const title = "Settings"
    const [deleteOrgDialog, setDeleteOrgDialog] = useState(false)

    const { showSuccessToast } = useToast()
    const { data, error, loading } = useGetUserQuery()
    const [deleteOrganization, deleteOrganizationResult] = useDeleteOrganizationMutation({
        refetchQueries: ['GetUser', 'GetOrganizationAndMembers'],
        onCompleted: () => {
            showSuccessToast("Organization deleted.")
            removeToken()
        }
    })

    if (loading || !data) return <Layout title={title} loading />
    if (!data.user.organization) return <Redirect to="/org/create" />
    if (error) return <Layout title={title}><FormError error={error.message}/></Layout>

    const organization = data.user.organization

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

    const adminCount = countAdmins(organization.members)

    return (
        <>
            <Layout title={title}>
                <Container>
                    <Section className={styles.header}>
                        <h1>{organization.name}</h1>
                    </Section>
                    <Section>
                        <h2>Options</h2>
                    </Section>
                    <Section>
                        <OrgSettings organization={organization} />
                    </Section>
                    <Section>
                        <h2>Members</h2>
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
                    {deleteOrganizationResult.error && (
                        <FormError
                            error={getErrorMessage(deleteOrganizationResult.error.message)}
                        />
                    )}
                    <RoleRestricted allowed={[Role.Admin]}>
                        <Invite orgID={data.user.organization.id} />
                        <Section>
                            <Button onClick={() => setDeleteOrgDialog(true)} primary variant="caution" small>
                                Delete Organization
                            </Button>
                        </Section>
                    </RoleRestricted>
                </Container>
            </Layout>
            {deleteOrgDialog && <ConfirmDeleteOrg />}
        </>
    )
}

function getPossibleReports(user: User, users: User[]): User[] {
    return users.filter(n => n.id != user.id)
}

export default Org