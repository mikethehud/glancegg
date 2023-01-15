import { NextPage } from "next"
import { Layout } from "../../components/layout/Layout"
import { Container } from "../../components/container/Container"
import { useGetUserQuery } from "../../lib/graphql/generated/generated"
import { Invite } from "../../components/invite/Invite"
import { Section } from "../../components/container/Section"
import { Card } from "../../components/card/Card"
import { faUsers } from "@fortawesome/free-solid-svg-icons"

const Home: NextPage = () => {
    const user = useGetUserQuery()
    const title = "Home"

    if (user.loading) {
        return <Layout title={title} loading />
    }

    if (!user.data || !user.data.user) {
        return <Layout title={title}>Error</Layout>
    }

    const userData = user.data.user
    const orgData = userData.organization

    return (
        <Layout title={title}>
            <Container size="medium">
                <Section>
                    <h1>Welcome, {userData.firstName} {userData.lastName}! 👋</h1>
                </Section>
                <Section>
                    <p>You are currently using the ALPHA test version of Ponder.</p>
                    <p>If you have any questions or feedback, please join <a>our Discord server</a> and post in the <strong>#support</strong> channel.</p>
                </Section>
                {orgData && orgData.members.length == 1 && (
                    <Section>
                        <Card icon={faUsers} shadow>
                            <Section>
                                It looks like you are the only member in your organization. Share this link to invite your team mates.
                            </Section>
                            <Invite orgID={orgData.id} />
                        </Card>
                    </Section>
                )}
            </Container>
        </Layout>
    )
}

export default Home