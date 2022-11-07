import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Section } from "../../components/section/Section";
import Link from "next/link";
import { TextLink } from "../../components/textLink/TextLink";
import styles from "./Logout.module.css"
import { useLogOutMutation } from "../../lib/graphql/generated/generated";
import { FormError } from "../../components/formError/FormError";
import { removeToken } from "../../lib/jwt/jwt";
import { LayoutPublic } from "../../components/layout/LayoutPublic";
import { useApolloClient } from "@apollo/client";

const Logout: NextPage = () => {
    const [logOut, { loading, error }] = useLogOutMutation()
    const client = useApolloClient()

    useEffect(() => {
        logOut().then(() => {
            removeToken()
            client.clearStore()
        })
    }, [])

    loading && <LayoutPublic loading={true} />

    return (
        <LayoutPublic>
            {error && <FormError error={error?.message} />}
            <Section size="small">
                <h1>Successfully logged out.</h1>
                <p>Have a great day! 👋</p>
            </Section>
            <Section size="small" className={styles.bottomLinks}>
                <div>
                    <Link href="/login"><TextLink primary>Log In</TextLink></Link>
                </div>
                <div>
                    <Link href="/signup"><TextLink>Create New Account</TextLink></Link>
                </div>
            </Section>
        </LayoutPublic>
    )
}

export default Logout