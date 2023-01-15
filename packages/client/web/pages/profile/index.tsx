import { NextPage } from "next"
import { Button } from "../../components/button/Button"
import { Section } from "../../components/container/Section"
import { FormError } from "../../components/formError/FormError"
import { Layout } from "../../components/layout/Layout"
import { Redirect } from "../../components/redirect/Redirect"
import { useDeleteUserMutation } from "../../lib/graphql/generated/generated"
import { LeaveOrg } from "../org/LeaveOrg"

const Profile: NextPage = () => {
    const [deleteUser, { data, error, loading }] = useDeleteUserMutation()

    if (data && !error) return <Redirect to="/logout" />

    return (
        <Layout title="Profile">
            <Section>
                <Button onClick={() => deleteUser()} loading={loading} primary variant="caution">Delete User</Button>
            </Section>
            <Section>
                <LeaveOrg />
            </Section>
            {error && <FormError error={error.message} />}
        </Layout>
    )
}

export default Profile
