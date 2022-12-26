import { NextPage } from "next"
import { useRouter } from "next/router"
import { BottomLink, BottomLinks } from "../../components/bottomLinks/BottomLinks"
import { Container } from "../../components/container/Container"
import { Section } from "../../components/container/Section"
import { LayoutPublic } from "../../components/layout/LayoutPublic"
import { SignupForm } from "../../components/signup/SignupForm"
import { SignupFormWithOrg } from "../../components/signup/SignupFormWithOrg"
import { useGetOrganizationInfoQuery } from "../../lib/graphql/generated/generated"
import { useAuth } from "../../lib/hooks/useAuth"

interface IniviteSignupProps {
    orgID: string
    redirectToHome: () => void
    currentPath: string
}

const InviteSignup = ({ orgID, redirectToHome, currentPath }: IniviteSignupProps) => {
    const { data, loading } = useGetOrganizationInfoQuery({ variables: { orgID } })
    return (
        <LayoutPublic loading={loading}>
            <Container size="medium">
                <Section>
                    <h1>Join {data?.organizationInfo.name} on Masterful.</h1>
                </Section>
                <Section>
                    Todo: Add some text here to explain why it's cool 😎
                </Section>
                <SignupFormWithOrg
                    organizationID={orgID}
                    onSuccess={() => redirectToHome()}
                />
            </Container>
            <BottomLinks>
                <BottomLink href={`/login?redirectTo=`+currentPath} primary>
                    Already Have An Account?
                </BottomLink>
            </BottomLinks>
        </LayoutPublic>
    )
}

interface IniviteSwitchProps {
    orgID: string
}

const InviteSwitch = ({ orgID }: IniviteSwitchProps) => {
    const { data, loading } = useGetOrganizationInfoQuery({ variables: { orgID } })
    return (
        <div>Swtich</div>
    )
}

// todo: improve
const InviteError = () => <div>Unexpected Error: Your Invite Link is bad.</div>

const Invite: NextPage = ({}) => {
    const router = useRouter()
    const { query: { orgID }, isReady } = router
    const { loading, authenticated, tokenData } = useAuth()

    const redirectToHome = () => router.push('/home')
    const redirectToSwitch = () => router.push

    if (loading || !isReady) {
        return <LayoutPublic loading={loading} />
    }

    if (typeof(orgID) !== "string") {
        return <InviteError />
    }

    if (authenticated && tokenData && tokenData.orgID) {
        if (orgID === tokenData.orgID) {
            // if already logged in and same org, go home
            redirectToHome()
        }
        else {
            return <InviteSwitch orgID={orgID} />
        }
    }

    return (
        <InviteSignup
            orgID={orgID}
            redirectToHome={() => redirectToHome()}
            currentPath={router.asPath}
        />
    )
}

export default Invite