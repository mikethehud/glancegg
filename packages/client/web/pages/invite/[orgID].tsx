import { NextPage } from "next"
import Router, { useRouter } from "next/router"
import { BottomLink, BottomLinks } from "../../components/bottomLinks/BottomLinks"
import { Button } from "../../components/button/Button"
import { Container } from "../../components/container/Container"
import { Section } from "../../components/container/Section"
import { LayoutPublic } from "../../components/layout/LayoutPublic"
import { Redirect } from "../../components/redirect/Redirect"
import { SignupFormWithOrg } from "../../components/signup/SignupFormWithOrg"
import { useToast } from "../../lib/context/toastContext"
import { useGetOrganizationInfoQuery, useGetUserQuery, useJoinOrganizationMutation } from "../../lib/graphql/generated/generated"
import { useAuth } from "../../lib/hooks/useAuth"
import { removeToken } from "../../lib/jwt/jwt"

interface IniviteSignupProps {
    orgID: string
    redirectToHome: () => void
    currentPath: string
}

const InviteSignup = ({ orgID, redirectToHome, currentPath }: IniviteSignupProps) => {
    const { showSuccessToast } = useToast()
    const router = useRouter()
    const [joinOrg] = useJoinOrganizationMutation({
        onCompleted: () => {
            showSuccessToast(`Joined ${data?.organizationInfo.name}`)
            removeToken()
            router.push('/home')
        },
        refetchQueries: ['GetUser', 'GetOrganizationAndMembers']
    })
    const { data, loading } = useGetOrganizationInfoQuery({ variables: { orgID } })
    const user = useGetUserQuery()

    function join() {
        if (!user.data || !data) {
            return
        }
        joinOrg({
            variables: {
                orgID: data.organizationInfo.id
            }
        })
    }

    if (user.loading || loading) {
        return <LayoutPublic loading />
    }

    if (!data) {
        return <LayoutPublic>Error loading invite.</LayoutPublic>
    }

    return (
        <LayoutPublic title={`Join ${data.organizationInfo.name}`} loading={loading}>
            <Container size="medium">
                <Section>
                    <h1>Join {data.organizationInfo.name} on Masterful.</h1>
                </Section>
                <Section>
                    Todo: Add description
                </Section>
                <Section>
                    {user.data
                        ? <Button primary variant="do" onClick={() => join()}>&rarr; Join {data.organizationInfo.name}</Button>
                        : (
                            <SignupFormWithOrg
                                organizationID={orgID}
                                onSuccess={() => redirectToHome()}
                            />
                        )
                    }
                </Section>
                <BottomLinks>
                    {!user.data && (
                        <BottomLink href={`/login?redirectTo=`+currentPath} primary>
                            Already Have An Account?
                        </BottomLink>
                    )}
                </BottomLinks>
            </Container>
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

    if (loading || !isReady) {
        return <LayoutPublic loading={loading} />
    }

    if (typeof(orgID) !== "string") {
        return <InviteError />
    }

    if (authenticated && tokenData && tokenData.orgID) {
        redirectToHome()
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
