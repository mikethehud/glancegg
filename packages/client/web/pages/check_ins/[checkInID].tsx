import { NextPage } from "next"
import { useRouter } from "next/router"
import { Container } from "../../components/container/Container"
import { Section } from "../../components/container/Section"
import { Layout } from "../../components/layout/Layout"
import { Questions, Question } from "../../components/question/Question"
import { useGetCheckInByIdQuery } from "../../lib/graphql/generated/generated"

const CheckIn: NextPage = ({}) => {
    const router = useRouter()
    const { query: { checkInID }, isReady } = router
    const safeCheckInID = typeof(checkInID) == "string" ? checkInID : ""
    const { data, loading } = useGetCheckInByIdQuery({ variables: { checkInID: safeCheckInID } })

    if (loading || !isReady) {
        return <Layout loading />
    }

    if (!data || !data.checkInByID) {
        return <Layout>Error loading check in</Layout>
    }

    return (
        <Layout>
            <Container size="medium">
                <Section>
                    <h1>Check In</h1>
                </Section>
                <Section>
                    <Questions>
                        {data.checkInByID.questions.map(({questionType, responseType, text}) => <Question questionType={questionType} responseType={responseType} text={text} />)}
                    </Questions>
                </Section>
            </Container>
        </Layout>
    )
}

export default CheckIn