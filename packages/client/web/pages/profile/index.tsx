import { NextPage } from "next"
import { Button } from "../../components/button/Button"
import { FormError } from "../../components/formError/FormError"
import { Layout } from "../../components/layout/Layout"
import { Redirect } from "../../components/redirect/Redirect"
import { useDeleteUserMutation } from "../../lib/graphql/generated/generated"

const Profile: NextPage = () => {
    const [deleteUser, { data, error, loading }] = useDeleteUserMutation()

    if (data && !error) return <Redirect to="/logout" />

    return (
        <Layout>
            <Button onClick={() => deleteUser()} loading={loading} primary variant="caution">Delete User</Button>
            {error && <FormError error={error.message} />}
        </Layout>
    )
}

export default Profile
