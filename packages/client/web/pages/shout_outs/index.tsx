import { NextPage } from "next"
import { Layout } from "../../components/layout/Layout"
import { Container } from "../../components/container/Container"
import { Section } from "../../components/container/Section"
import { GetShoutOutsQuery, useCreateShoutOutMutation, useGetOrganizationAndMembersQuery, useGetShoutOutsQuery } from "../../lib/graphql/generated/generated"
import { TextArea } from "../../components/textInput/TextArea"
import { useState } from "react"
import { Button } from "../../components/button/Button"
import { MultiSelect } from "../../components/multiSelect/MultiSelect"
import { Spinner } from "../../components/spinner/Spinner"
import styles from "./ShoutOuts.module.css"
import { ShoutOut } from "../../components/shoutOut/ShoutOut"
import { ShoutOutList } from "../../components/shoutOut/ShoutOutList"
import { Card } from "../../components/card/Card"
import { ShoutOutForm } from "../../components/shoutOut/ShoutOutForm"

const ShoutOuts: NextPage = () => {
    const { data } = useGetShoutOutsQuery()

    return (
        <Layout title="Shout Outs">
            <Container size="medium">
                <Section>
                    <h1>Shout Outs</h1>
                </Section>
                <Section className={styles.shoutOuts}>
                    {data && data.shoutOuts
                        ? <ShoutOutList shoutOuts={data.shoutOuts} />
                        : "No shout outs."
                    }
                </Section>
            </Container>
        </Layout>
    )
}

export default ShoutOuts