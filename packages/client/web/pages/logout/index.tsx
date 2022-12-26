import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Container } from "../../components/container/Container";
import Link from "next/link";
import { TextLink } from "../../components/textLink/TextLink";
import styles from "./Logout.module.css"
import { useLogOutMutation } from "../../lib/graphql/generated/generated";
import { FormError } from "../../components/formError/FormError";
import { removeToken } from "../../lib/jwt/jwt";
import { LayoutPublic } from "../../components/layout/LayoutPublic";
import { useApolloClient } from "@apollo/client";
import { BottomLink, BottomLinks } from "../../components/bottomLinks/BottomLinks";

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
            <Container size="small">
                <h1>Successfully logged out.</h1>
                <p>Have a great day! 👋</p>
            </Container>
            <BottomLinks>
                <BottomLink href="/login" primary>
                    Log In
                </BottomLink>
            </BottomLinks>
        </LayoutPublic>
    )
}

export default Logout