import { NextPage } from "next"
import { Layout } from "../../components/layout/Layout"
import { Container } from "../../components/container/Container"
import { useGetCheckInsQuery } from "../../lib/graphql/generated/generated"
import { Section } from "../../components/container/Section"
import { CheckInPreivew } from "../../components/checkInPreview/CheckInPreview"
import { CheckInTabs } from "./CheckInTabs"
import styles from "./CheckIns.module.css"

const CheckIns: NextPage = () => {
    const { data, loading } = useGetCheckInsQuery()
    const title = "Check-Ins"

    if (loading || !data) {
       return <Layout loading title={title} />
    }

    return (
        <Layout title={title}>
            <Container size="medium">
                <Section>
                    <h1>Check-Ins</h1>
                </Section>
                <Section>
                    <CheckInTabs active="/check_ins" />
                </Section>
                <Section>
                    <div className={styles.checkInOverview}>
                        {data.checkIns
                            ? data.checkIns.map(checkIn =>(
                                <CheckInPreivew
                                    id={checkIn.id}
                                    expiresAt={checkIn.expiresAt}
                                    completedAt={checkIn.completedAt}
                                    reviewedAt={checkIn.reviewedAt}
                                    expired={checkIn.expired}
                                />
                            ))
                            : "No check-ins."
                        }
                    </div>
                </Section>
            </Container>
        </Layout>
    )
}

export default CheckIns