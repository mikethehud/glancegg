import { faBook } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"
import { useState } from "react"
import { ResponseType, useGetCheckInByIdWithResponsesQuery, useGetShoutOutsByCheckInIdQuery, useGetUserQuery, useSubmitCheckInReviewMutation } from "../../lib/graphql/generated/generated"
import { Avatar } from "../avatar/Avatar"
import { Button } from "../button/Button"
import { Card } from "../card/Card"
import { Section } from "../container/Section"
import { FormElement } from "../formElement/FormElement"
import { Question } from "../question/Question"
import { ScaleResponse } from "../question/Responses/ScaleResponse"
import { TextResponse } from "../question/Responses/TextResponse"
import { ShoutOut } from "../shoutOut/ShoutOut"
import { Spinner } from "../spinner/Spinner"
import { TextArea } from "../textInput/TextArea"
import { TextInput } from "../textInput/TextInput"
import styles from "./CheckIn.module.css"

interface PanelProps {
    completedAt?: any
    reviewedAt?: any
    review?: string | null
    reviewer: {
        firstName: string
        lastName: string
    }
}

const InfoPanel = ({completedAt, reviewedAt, review, reviewer }: PanelProps) => {
    return (
        <div className={styles.info}>
            {completedAt && <div className={styles.infoText}><strong>Completed on</strong> {new Date(completedAt).toDateString()}</div>}
            {reviewedAt && review && (
                <div className={styles.review}>
                    <div className={styles.reviewBy}>
                        <Avatar name={reviewer.firstName} />
                        <strong>{reviewer.firstName} {reviewer.lastName}</strong>
                        left a review on {new Date(reviewedAt).toDateString()}
                    </div>
                    <div className={styles.reviewText}>{review}</div>
                </div>
            )}
        </div>
    )
}

const ReviewForm = ({ checkInID }: { checkInID: string }) => {
    const [submitReview, { loading }] = useSubmitCheckInReviewMutation()
    const [review, setReview] = useState("")

    function submit() {
        submitReview({
            variables: {
                input: {
                    checkInID,
                    review
                }
            }
        })
    }

    return (
        <Card shadow>
            <Section>
                <FormElement label="Leave a Review">
                    <TextArea placeholder="..." block onChange={e => setReview(e.target.value)} />
                </FormElement>
            </Section>
            <Section>
                <Button primary loading={loading} onClick={() => submit()} disabled={review == ""}>Add Review</Button>
            </Section>
        </Card>
    )
}

interface CheckInCompletedProps {
    checkIn: {
        id: string
    }
}

type AnyResponse = ({
    __typename: "ScaleResponse";
    id: string;
    intResponse: number;
} | {
    __typename: "TaskResponse";
    id: string;
    taskResponse: string;
} | {
    __typename: "TextResponse";
    id: string;
    textResponse: string;
})

export const CheckInCompleted = ({ checkIn }: CheckInCompletedProps) => {
    const user = useGetUserQuery()
    const { data, loading } = useGetCheckInByIdWithResponsesQuery({variables: { checkInID: checkIn.id }})
    const shoutOuts = useGetShoutOutsByCheckInIdQuery({variables: { checkInID: checkIn.id }})

    if (user.loading || loading) {
        return <Spinner />
    }

    if (!user.data || !user.data.user || !data || !data.checkInByID) {
        return <div>Error loading check-in</div>
    }

    const isReviewer = user.data.user.id === data.checkInByID.reviewer.id
    
    return (
        <>
            <Section>
                <InfoPanel
                    completedAt={data.checkInByID.completedAt}
                    reviewedAt={data.checkInByID.reviewedAt}
                    review={data.checkInByID.review}
                    reviewer={data.checkInByID.reviewer}
                />
            </Section>
            <Section>
                <div className={styles.questions}>
                    {data.checkInByID.questions.map(
                        ({id, responseType, text, responses}) => {
                            if (!responses) {
                                return "No responses."
                            }
                            
                            switch(responseType) {
                                case ResponseType.Scale:
                                    return <ScaleResponse text={text} response={responses[0]} />
                                case ResponseType.Text:
                                    return <TextResponse text={text} responses={responses} />
                                case ResponseType.Task:
                                    return <TextResponse text={text} responses={responses} />
                            }
                        }
                    )}
                    {shoutOuts.data && shoutOuts.data.shoutOutsByCheckInID && shoutOuts.data.shoutOutsByCheckInID.map(s => (
                        <Question text="Shout Outs">
                            <ShoutOut createdAt={s.createdAt} shoutOut={s.shoutOut} receivers={s.receivers} user={s.user} />
                        </Question>
                    ))}
                </div>
            </Section>
            {isReviewer && !data.checkInByID.reviewedAt && <ReviewForm checkInID={data.checkInByID.id} />}
        </>
    )
}