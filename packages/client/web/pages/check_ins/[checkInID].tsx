import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Back } from "../../components/back/Back"
import { CheckInCompleted } from "../../components/checkIn/CheckInCompleted"
import { CheckInNew } from "../../components/checkIn/CheckInNew"
import { Container } from "../../components/container/Container"
import { Section } from "../../components/container/Section"
import { Layout } from "../../components/layout/Layout"
import { useGetCheckInByIdQuery, useGetUserQuery } from "../../lib/graphql/generated/generated"

const CheckIn: NextPage = ({}) => {
    const router = useRouter()
    const { query: { checkInID }, isReady } = router
    const safeCheckInID = typeof(checkInID) == "string" ? checkInID : ""
    const { data, loading } = useGetCheckInByIdQuery({variables: { checkInID: safeCheckInID }})
    const user = useGetUserQuery()
    const title = "Check-In"

    if (user.loading || loading || !isReady) {
        return <Layout loading title={title} />
    }

    if (!user.data || !data || !user.data.user || !data.checkInByID) {
        return <Layout title={title}>Error loading check-in</Layout>
    }

    const isReviewer = data.checkInByID.reviewer.id === user.data.user.id

    return (
        <Layout title={title}>
            <Container size="medium">
                <Section>
                    <h1>
                        <Back href={isReviewer ? '/check_ins/reports' : '/check_ins'} />
                        Check-In
                    </h1>
                </Section>
                {data.checkInByID.completedAt
                    ? <CheckInCompleted checkIn={data.checkInByID} />
                    : <CheckInNew checkIn={data.checkInByID} />
                }
            </Container>
        </Layout>
    )
}

export default CheckIn
