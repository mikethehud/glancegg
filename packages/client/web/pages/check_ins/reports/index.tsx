import { NextPage } from "next"
import { Layout } from "../../../components/layout/Layout"
import { Container } from "../../../components/container/Container"
import styles from "../CheckIns.module.css"
import { useGetCheckInsByReviewerQuery } from "../../../lib/graphql/generated/generated"
import { LayoutLoading } from "../../../components/layout/LayoutLoading"
import { Section } from "../../../components/container/Section"
import { Tab, Tabs } from "../../../components/tabs/Tabs"
import { useRouter } from "next/router"
import { CheckInPreivew } from "../../../components/checkInPreview/CheckInPreview"
import { Divider } from "../../../components/divider/Divider"
import { CheckInTabs } from "../CheckInTabs"

interface PartialCheckIn {
    __typename?: "CheckIn" | undefined;
    id: string;
    createdAt: any;
    completedAt?: any;
    reviewedAt?: any;
    expiresAt: any;
    user: {
        __typename?: "User" | undefined;
        firstName: string;
        lastName: string;
    };
}

interface GroupedCheckIns {
    ready: PartialCheckIn[]
    others: PartialCheckIn[]
}

const CheckIns: NextPage = () => {
    const { data, loading } = useGetCheckInsByReviewerQuery()
    const title = "Check-Ins"

    if (loading || !data) {
       return <Layout title={title} loading />
    }

    const groupedCheckIns: GroupedCheckIns = data.checkInsByReviewer
        ? data.checkInsByReviewer.reduce<GroupedCheckIns>((acc, curr) => {
                if(curr.completedAt && !curr.reviewedAt) {
                    acc['ready'].push(curr)
                } else {
                    acc['others'].push(curr)
                }
                return acc
            }, { ready: [], others: [] })
        : { ready: [], others: [] }

    const AllCheckIns = () => {
        if (groupedCheckIns.ready.length > 0) {
            return (
                <>
                    <Section>
                        <h4>Ready for Review</h4>
                    </Section>
                    <Section>
                        <CheckInList checkIns={groupedCheckIns.ready} />
                    </Section>
                    { groupedCheckIns.others.length > 0 && (
                        <>
                            <Divider />
                            <Section>
                                <CheckInList checkIns={groupedCheckIns.others} />
                            </Section>
                        </>
                    )}
                </>
            )
        }
        return groupedCheckIns.others.length > 0
            ? <Section><CheckInList checkIns={groupedCheckIns.others} /></Section>
            : <Section>No check-ins.</Section>
    }

    return (
        <Layout title={title}>
            <Container size="medium">
                <Section>
                    <h1>Check-Ins</h1>
                </Section>
                <Section>
                    <CheckInTabs active="/check_ins/reports" />
                </Section>
                <AllCheckIns />
            </Container>
        </Layout>
    )
}

interface CheckInListProps {
    checkIns: PartialCheckIn[]
}

const CheckInList = ({ checkIns }: CheckInListProps) => (
    <div className={styles.checkInOverview}>
        {checkIns.map(checkIn =>(
            <CheckInPreivew
                id={checkIn.id}
                expiresAt={checkIn.expiresAt}
                completedAt={checkIn.completedAt}
                reviewedAt={checkIn.reviewedAt}
                user={checkIn.user}
                isReviewer
            />
        ))}
    </div>
)

export default CheckIns