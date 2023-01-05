import { NextPage } from "next"
import { Layout } from "../../components/layout/Layout"
import { Container } from "../../components/container/Container"
import styles from "./CheckIns.module.css"
import { useGetCheckInsQuery } from "../../lib/graphql/generated/generated"
import { LayoutLoading } from "../../components/layout/LayoutLoading"
import classNames from "classnames"
import { Section } from "../../components/container/Section"
import { Card } from "../../components/card/Card"
import Link from "next/link"

interface CheckInPreviewProps {
    id: string
    createdAt: EpochTimeStamp
    completedAt?: EpochTimeStamp
    reviewedAt?: EpochTimeStamp
}

const CheckInPreivew = ({ id, createdAt, completedAt, reviewedAt }: CheckInPreviewProps) => {
    const now = new Date();
    const lastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    const createdDate = new Date(createdAt)
    const currentTimePeriod = createdDate > lastWeek
    console.log("currentTimePeriod", currentTimePeriod)

    return (
        <Link href={`/check_ins/${id}`}>
            <Card className={classNames(styles.checkInPreview, currentTimePeriod && styles.currentCheckIn)} hoverEffect>
                <div className={styles.checkInPreviewTitle}><strong>Check In</strong> from {createdDate.toDateString()}</div>
                <CheckInStatus pastDue={!currentTimePeriod} completedAt={completedAt} reviewedAt={reviewedAt} />
            </Card>
        </Link>
    )
}

interface CheckInStatusProps {
    pastDue?: boolean
    completedAt?: EpochTimeStamp
    reviewedAt?: EpochTimeStamp
}

const CheckInStatus = ({ pastDue, completedAt, reviewedAt }: CheckInStatusProps) => {
    if (reviewedAt) {
        return <div className={classNames(styles.checkInStatus, styles.reviewed)}>Reviewed</div>
    }
    if (completedAt) {
        return <div className={classNames(styles.checkInStatus, styles.completed)}>In Review</div>
    }
    if (pastDue) {
        return <div className={classNames(styles.checkInStatus, styles.pastDue)}>Past Due</div>
    }
    return null
}

const CheckIns: NextPage = () => {
    const { data, loading } = useGetCheckInsQuery()

    if (loading || !data) {
       return <LayoutLoading />
    }

    return (
        <Layout>
            <Container size="medium">
                <Section>
                    <h1>Check Ins</h1>
                </Section>
                <Section>
                    <div className={styles.checkInOverview}>
                        {data.checkIns?.map(checkIn => (
                            <CheckInPreivew
                                id={checkIn.id}
                                createdAt={checkIn.createdAt}
                            />
                        ))}
                    </div>
                </Section>
            </Container>
        </Layout>
    )
}

export default CheckIns